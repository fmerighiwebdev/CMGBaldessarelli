import Image from "next/image";
import Link from "next/link";

import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { news } from "@/utils/news";
import styles from "./news.module.css";

const description =
  "Leggi le ultime novita di CMG Baldessarelli su accessori per il vigneto, soluzioni agricole e prodotti per proteggere le coltivazioni.";

function formatDateDDMMYYYY(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function BreadcrumbJsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Breadcrumb News",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: `${siteUrl}/news`,
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
  title: "News",
  description,
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News | CMG Baldessarelli",
    description,
    url: "/news",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News | CMG Baldessarelli",
    description,
  },
};

export default function NewsIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd />
      <main id="main-content" className={styles.newsPage}>
        <section>
          <div className={styles.newsHeading}>
            <div className="container">
              <h1>News</h1>
            </div>
          </div>
          <div className={styles.newsContent}>
            <div className="container">
              <Breadcrumbs
                items={[{ label: "Home", href: "/" }, { label: "News" }]}
              />
              <ul className={styles.newsList}>
                {news.map((newsItem) => (
                  <li key={newsItem.slug} className={styles.newsItem}>
                    <Link href={`/news/${newsItem.slug}`}>
                      {newsItem.images[0] && (
                        <Image
                          src={newsItem.images[0]}
                          alt={newsItem.alt}
                          width={600}
                          height={400}
                        />
                      )}
                      <div className={styles.newsInfo}>
                        <p>{formatDateDDMMYYYY(newsItem.published_at)}</p>
                        <h2>{newsItem.title}</h2>
                        <span>{newsItem.short_description}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
