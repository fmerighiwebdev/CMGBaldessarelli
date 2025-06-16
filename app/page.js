import About from "@/components/about/about";
import Hero from "@/components/hero/hero";

import styles from "./page.module.css";
import Pills from "@/components/pills/pills";
import News from "@/components/news/news";

function OrganizationJsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CMG Baldessarelli",
    url: siteUrl,
    logo: `${siteUrl}/images/logo-full-black.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+393450219562",
      email: "info@cmgbaldessarelli.it",
      contactType: "Servizio Clienti",
      areaServed: "IT",
      availableLanguage: ["Italian"],
    },
    description:
      "CMG Baldessarelli è un'azienda specializzata nella vendita di accessori per il vigneto con sede a Villa Lagarina, in provincia di Trento.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Alcide Degasperi, 55",
      addressLocality: "Villa Lagarina",
      postalCode: "38060",
      addressRegion: "TN",
      addressCountry: "IT",
    },
    sameAs: ["https://www.instagram.com/cmg_baldessarelli"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <main id="main-content" className={styles.homePage}>
        <Hero />
        <About />
        <Pills />
        <News />
      </main>
    </>
  );
}
