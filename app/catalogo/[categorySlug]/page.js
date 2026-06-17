import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import {
  categories,
  getCategoryBySlug,
  getCategoryName,
} from "@/utils/categories";
import { products } from "@/utils/products";
import styles from "../catalogo.module.css";

export async function generateStaticParams() {
  const categorySlugs = Array.from(
    new Set(products.map((product) => product.categorySlug))
  );

  return categorySlugs.map((categorySlug) => ({
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

  return {
    categoryProducts,
    categoryName: getCategoryName(slug),
    category: getCategoryBySlug(slug),
  };
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
  const { categorySlug } = await params;
  const { categoryName, category } = getCategoryData(categorySlug);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const title = `${categoryName}`;
  const description =
    category?.intro ||
    `Scopri la nostra selezione di ${categoryName.toLowerCase()} per il vigneto. Qualita e innovazione con CMG Baldessarelli.`;
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
      images: [{ url: imageUrl, alt: `Immagine di ${categoryName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = await params;
  const { categoryProducts, categoryName, category } =
    getCategoryData(categorySlug);
  const otherCategories = categories.filter(
    (catalogCategory) => catalogCategory.slug !== categorySlug
  );

  return (
    <>
      <BreadcrumbJsonLd
        categorySlug={categorySlug}
        categoryName={categoryName}
      />
      <main className={styles.categoryPage}>
        <section>
          <div className={styles.catalogoHeading}>
            <div className="container">
              <h1>{categoryName}</h1>
              <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Catalogo", href: "/catalogo" },
                    { label: categoryName },
                  ]}
                />
            </div>
          </div>
          <div className={styles.catalogoContent}>
            <div className="container">
              <div className={styles.categoryIntro}>
                <p>
                  {category?.intro ||
                    `Accessori della categoria ${categoryName} per impianti viticoli professionali.`}
                </p>
              </div>
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
              <nav
                className={styles.categoryLinks}
                aria-label="Altre categorie del catalogo"
              >
                <h2>Altre categorie</h2>
                <ul>
                  {otherCategories.map((catalogCategory) => (
                    <li key={catalogCategory.slug} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                      <Image
                        src={catalogCategory.image}
                        alt={catalogCategory.name}
                        width={300}
                        height={200}
                        style={{ width: "200px", height: "100px", objectFit: "cover" }}
                      />
                      <Link href={`/catalogo/${catalogCategory.slug}`}>
                        {catalogCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
