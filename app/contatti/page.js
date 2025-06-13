import Image from "next/image";

import styles from "./contatti.module.css";
import ContactForm from "@/components/contact-form/contact-form";

function LocalBusinessJsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CMG Baldessarelli",
    description:
      "Vendita di accessori per il vigneto e soluzioni per l'agricoltura a Villa Lagarina (TN).",
    url: siteUrl,
    logo: `${siteUrl}/images/cmg-logo-full-black.svg`,
    sameAs: ["https://www.instagram.com/cmg_baldessarelli"],
    telephone: "+393450219562",
    email: "info@cmgbaldessarelli.it",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Alcide Degasperi, 55",
      addressLocality: "Villa Lagarina",
      postalCode: "38060",
      addressRegion: "TN",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.920469,
      longitude: 11.023178,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbJsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contatti",
        item: `${siteUrl}/contatti`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

export const metadata = {
  title: "Contattaci",
  description:
    "Hai bisogno di informazioni sui nostri accessori per il vigneto? Contattaci subito! CMG Baldessarelli si trova a Villa Lagarina, in provincia di Trento.",
  alternates: {
    canonical: "/contatti",
  },
};

export default function Contatti() {
  return (
    <>
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <main id="main-content" className={styles.contactsPage}>
        <section>
          <div className={styles.contactsHeading}>
            <h1>Contatti</h1>
          </div>
          <div className={styles.contactsContent}>
            <div className="container">
              <div
                className={`row ${styles.contactsColumns} gap-5 gap-md-0 align-items-start`}
              >
                <div className="col-12 col-md-6">
                  <div className={styles.contactInfos}>
                    <address className={styles.contactsAddress}>
                      <Image
                        src="/icons/location.svg"
                        width={48}
                        height={48}
                        alt="Indirizzo sede CMG BALDESSARELLI"
                      />
                      <div>
                        <p>Via Alcide Degasperi, 55</p>
                        <p>38060 - Villa Lagarina (TN)</p>
                      </div>
                    </address>
                    <div className={styles.contactsPhone}>
                      <Image
                        src="/icons/phone.svg"
                        alt="Telefono CMG BALDESSARELLI"
                        width={48}
                        height={48}
                      />
                      <a href="tel:+393450219562">+39 345 0219562</a>
                    </div>
                    <div className={styles.contactsEmail}>
                      <Image
                        src="/icons/email.svg"
                        alt="Email CMG BALDESSARELLI"
                        width={48}
                        height={48}
                      />
                      <div>
                        <a href="mailto:info@cmgbaldessarelli.it">
                          info@cmgbaldessarelli.it
                        </a>
                        <a href="mailto:cmgbaldessarelli@pec.it">
                          cmgbaldessarelli@pec.it
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
