import Image from "next/image";
import styles from "./catalogo.module.css";

import Link from "next/link";

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
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
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
  const categories = [
    {
      name: "Tenditori",
      slug: "tenditori",
      image: "/images/category/tenditori.webp",
      alt: "Tenditori professionali per fili da vigneto",
    },
    {
      name: "Accessori di Testata",
      slug: "accessori-di-testata",
      image: "/images/category/accessori-di-testata.webp",
      alt: "Accessori di testata per pali da vigna",
    },
    {
      name: "Collari di Testata",
      slug: "collari-di-testata",
      image: "/images/category/collari-di-testata.webp",
      alt: "Collari di testata per la massima stabilità",
    },
    {
      name: "Collari Intermedi",
      slug: "collari-intermedi",
      image: "/images/category/collari-intermedi.webp",
      alt: "Collari intermedi per pali da vigneto",
    },
    {
      name: "Cavallotti",
      slug: "cavallotti",
      image: "/images/category/cavallotti.webp",
      alt: "Cavallotti e ganci per fili agricoli",
    },
    {
      name: "Accessori Speciali",
      slug: "accessori-speciali",
      image: "/images/category/accessori-speciali.webp",
      alt: "Accessori speciali e su misura per vigneto",
    },
  ];

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
          </div>
        </section>
      </main>
    </>
  );
}
