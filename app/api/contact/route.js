import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { contactSchema } from "@/utils/contact-schema";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore =
  globalThis.__cmgContactRateLimitStore ||
  (globalThis.__cmgContactRateLimitStore = new Map());

const htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

function sanitizeHeaderValue(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").slice(0, 120);
}

function getClientKey(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return `${ip}:${userAgent.slice(0, 80)}`;
}

function isRateLimited(request) {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const key = getClientKey(request);
  const current = rateLimitStore.get(key);

  if (!current) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function buildSelectedCodesHtml(selectedCodes) {
  if (selectedCodes.length === 0) {
    return "";
  }

  return `<p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;"><strong>Codici prodotto:</strong></p>
    <ul style="margin: 0 !important;">
      ${selectedCodes
        .map(
          (code) =>
            `<li style="font-family: 'Montserrat', sans-serif !important;">${escapeHtml(
              code
            )}</li>`
        )
        .join("")}
    </ul>`;
}

export async function POST(request) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { message: "Troppi tentativi. Riprova più tardi." },
      { status: 429 }
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Richiesta non valida." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Controlla i dati inseriti e riprova." },
      { status: 400 }
    );
  }

  const { name, phone, email, product, selectedCodes, message, website } =
    parsed.data;

  if (website) {
    return NextResponse.json(
      { message: "Messaggio inviato correttamente." },
      { status: 200 }
    );
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return NextResponse.json(
      { message: "Servizio momentaneamente non disponibile." },
      { status: 500 }
    );
  }

  const productChoosed = product ? `Si, ${escapeHtml(product)}` : "No";
  const selectedCodesChoosed = buildSelectedCodesHtml(selectedCodes);
  const messageInserted = message
    ? `<p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;">Il <strong>messaggio</strong> è il seguente:</p>
      <p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;">${escapeHtml(
        message
      )}</p>`
    : `<p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;">Il mittente non ha aggiunto alcuna nota aggiuntiva</p>`;

  const transporter = nodemailer.createTransport({
    host: "smtps.aruba.it",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 60000,
    pool: true,
  });

  const htmlBody = `
    <h1 style="font-family: 'Montserrat', sans-serif !important;">Hai ricevuto un <span style="color: #4caf50; text-transform: uppercase;">nuovo messaggio</span>!</h1>
    <div style="margin-block: 2rem;">
     <p style="margin: 0 !important;"><strong>Informazioni del mittente:</strong></p>
      <ul style="margin: 0 !important;">
        <li style="font-family: 'Montserrat', sans-serif !important;">Nome: ${escapeHtml(
          name
        )}</li>
        <li style="font-family: 'Montserrat', sans-serif !important;">Telefono: ${escapeHtml(
          phone
        )}</li>
        <li style="font-family: 'Montserrat', sans-serif !important;">Email: ${escapeHtml(
          email
        )}</li>
      </ul>
    </div>
    <div style="margin-bottom: 2rem !important;">
      <p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;"><strong>È interessato a qualche prodotto in particolare?</strong></p>
      <p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;">${productChoosed}</p>
      ${selectedCodesChoosed}
    </div>
    <div>
      ${messageInserted}
    </div>
  `;

  const mailOptions = {
    from: "CMG BALDESSARELLI <info@cmgbaldessarelli.it>",
    to: "info@cmgbaldessarelli.it",
    replyTo: email,
    subject: `Nuovo messaggio da parte di ${sanitizeHeaderValue(name)}`,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch {
    return NextResponse.json(
      { message: "Errore nell'invio del messaggio." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Messaggio inviato correttamente." },
    { status: 200 }
  );
}
