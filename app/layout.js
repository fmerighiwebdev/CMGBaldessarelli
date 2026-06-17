import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Lato, Raleway } from "next/font/google";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import Maintenance from "@/components/maintenance/maintenance";
import { SkipLink } from "@/components/skip-link/skip-link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

const siteConfig = {
  name: "CMG BALDESSARELLI - Soluzioni per l'Agricoltura",
  description:
    "CMG Baldessarelli è un'azienda specializzata nella vendita di accessori per il vigneto con sede a Villa Lagarina, in provincia di Trento.",
  url: siteUrl,
  ogImage: "/cmgbaldessarelli.webp",
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | CMG Baldessarelli",
    default: siteConfig.name,
  },
  description: siteConfig.description,

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteConfig.url,
    title: {
      template: "%s | CMG Baldessarelli",
      default: siteConfig.name,
    },
    description: siteConfig.description,
    siteName: "CMG Baldessarelli - Soluzioni per l'Agricoltura",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Logo e immagine promozionale di ${siteConfig.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | CMG Baldessarelli",
      default: siteConfig.name,
    },
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--heading-font",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--body-font",
});

export default function RootLayout({ children }) {
  const isMaintenance = false;

  return (
    <html lang="it" className={`${lato.variable} ${raleway.variable}`}>
      <body>
        <SkipLink />
        {isMaintenance ? (
          <Maintenance />
        ) : (
          <>
            <Header />
            {children}
            <Footer />
          </>
        )}
        <Script
          src={`https://cdn-cookieyes.com/client_data/61847c3470e48698986681a7/script.js`}
          strategy="afterInteractive"
        ></Script>
      </body>
    </html>
  );
}
