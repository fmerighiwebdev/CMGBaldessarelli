import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, phone, email, product, selectedCodes, message, privacy } =
    await request.json();

  console.log(name, phone, email, product, message, selectedCodes, privacy);

  if (!name || !phone || !email || !privacy) {
    return NextResponse.json(
      { message: "Tutti i campi vanno compilati." },
      { status: 400 }
    );
  }

  let productChoosed = product ? `Si, ${product}` : "No";
  let selectedCodesChoosed =
    selectedCodes.length > 0
      ? `<p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;"><strong>Codici prodotto:</strong></p>
      <ul style="margin: 0 !important;">
        ${selectedCodes
          .map(
            (code) =>
              `<li style="font-family: 'Montserrat', sans-serif !important;">${code}</li>`
          )
          .join("")}
      </ul>`
      : "";
  let messageInserted = message
    ? `<p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;">Il <strong>messaggio</strong> è il seguente:</p>
      <p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;">${message}</p>`
    : `<p style="font-family: 'Montserrat', sans-serif !important; margin: 0 !important;">Il mittente non ha aggiunto alcuna nota aggiuntiva</p>`;

  const transporter = nodemailer.createTransport({
    host: "smtps.aruba.it",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    logger: true,
    debug: true,
    connectionTimeout: 60000,
    pool: true,
  });

  const htmlBody = `
    <h1 style="font-family: 'Montserrat', sans-serif !important;">Hai ricevuto un <span style="color: #4caf50; text-transform: uppercase;">nuovo messaggio</span>!</h1>
    <div style="margin-block: 2rem;">
     <p style="margin: 0 !important;"><strong>Informazioni del mittente:</strong></p>
      <ul style="margin: 0 !important;">
        <li style="font-family: 'Montserrat', sans-serif !important;">Nome: ${name}</li>
        <li style="font-family: 'Montserrat', sans-serif !important;">Telefono: ${phone}</li>
        <li style="font-family: 'Montserrat', sans-serif !important;">Email: ${email}</li>
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
    subject: `Nuovo messaggio da parte di ${name}`,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
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
