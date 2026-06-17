import Image from "next/image";
import Link from "next/link";

import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { categories } from "@/utils/categories";
import styles from "./catalogo.module.css";

function BreadcrumbJsonLd() {
  const pageUrl = "/catalogo";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Breadcrumb Catalogo",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalogo",
        item: `${siteUrl}${pageUrl}`,
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

export async function generateMetadata() {
  const pageUrl = "/catalogo";
  const title = "Catalogo Prodotti";
  const description =
    "Esplora il nostro catalogo di accessori per vigneti. Scopri tenditori, collari, cavallotti e prodotti innovativi per la viticoltura.";

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function Catalogo() {
  return (
    <>
      <BreadcrumbJsonLd />
      <main id="main-content" className={styles.catalogoPage}>
        <section className={styles.catalogoHero}>
          <div className={styles.catalogoOverlay}>
            <Image
              src="/images/category/categorie-2.webp"
              alt="Vigneto rigoglioso con pali e accessori CMG Baldessarelli"
              fill
              priority
            />
            <div></div>
          </div>
          <div className={styles.catalogoHeroHeading}>
            <h1>Accessori per il Vigneto</h1>
            <p>Esplora i Nostri Prodotti</p>
          </div>
          <div className={styles.arrow}>
            <Link href="#categorie">
              <Image
                src="/icons/down-arrow.svg"
                alt="Scopri le nostre categorie"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </section>
        <section id="categorie" className={styles.catalogoCategories}>
          <div className="container">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Catalogo" }]}
            />
            <div className={styles.catalogoIntro}>
              <p>
                Seleziona la categoria piu adatta al tuo impianto: tenditori,
                collari, cavallotti e accessori speciali.
              </p>
            </div>
            <div className="row g-4">
              {categories.map((category) => (
                <div key={category.slug} className="col-12 col-md-6">
                  <Link
                    href={`/catalogo/${category.slug}`}
                    className={styles.categoryLink}
                  >
                    <div className={styles.category}>
                      <Image
                        src={category.image}
                        alt={category.alt}
                        width={600}
                        height={400}
                      />
                      <div className={styles.categoryOverlay}>
                        <h2>{category.name}</h2>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/contatti" className={styles.catalogoCta}>
              Richiedi informazioni
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
