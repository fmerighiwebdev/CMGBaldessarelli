import styles from "../catalogo.module.css";

import Image from "next/image";

import { products } from "@/utils/products";

import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(products.map((product) => product.categorySlug))
  );

  return categories.map((categorySlug) => ({
    categorySlug,
  }));
}

function getCategoryData(slug) {
  const categoryProducts = products.filter(
    (product) => product.categorySlug === slug
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return { categoryProducts, categoryName };
}

function BreadcrumbJsonLd({ categorySlug, categoryName }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: `Breadcrumb Catalogo - ${categoryName}`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalogo",
        item: `${siteUrl}/catalogo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `${siteUrl}/catalogo/${categorySlug}`,
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

export async function generateMetadata({ params }) {
  const { categorySlug } = params;
  const { categoryName } = getCategoryData(categorySlug);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const title = `${categoryName}`;
  const description = `Scopri la nostra selezione di ${categoryName.toLowerCase()} per il vigneto. Qualità e innovazione con CMG Baldessarelli.`;
  const pageUrl = `/catalogo/${categorySlug}`;
  const imageUrl = `${siteUrl}/images/category/${categorySlug}.webp`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: imageUrl
        ? [{ url: imageUrl, alt: `Immagine di ${categoryName}` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = params;
  const { categoryProducts, categoryName } = getCategoryData(categorySlug);

  return (
    <>
      <BreadcrumbJsonLd
        categorySlug={categorySlug}
        categoryName={categoryName}
      />
      <main className={styles.categoryPage}>
        <section>
          <div className={styles.catalogoHeading}>
            <h1>{categoryName}</h1>
          </div>
          <div className={styles.catalogoContent}>
            <div className="container">
              <ul className={styles.products}>
                {categoryProducts.map((product) => (
                  <li key={product.slug} className={styles.productCard}>
                    <Link href={`/catalogo/${categorySlug}/${product.slug}`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        height={400}
                      />
                      <div className={styles.productInfo}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <span className={styles.moreDetails}>
                          Maggiori dettagli
                        </span>
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
