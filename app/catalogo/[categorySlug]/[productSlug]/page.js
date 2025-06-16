import styles from "./product-page.module.css";

import Image from "next/image";
import { notFound } from "next/navigation";

import { products } from "@/utils/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    categorySlug: product.categorySlug,
    productSlug: product.slug,
  }));
}

function getProductData(productSlug) {
  const product = products.find((p) => p.slug === productSlug);
  if (!product) {
    notFound();
  }
  return product;
}

function ProductJsonLd({ product }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

  const categoryName = product.categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `${siteUrl}${img.src}`),
    sku: product.informations.articles.map((a) => a.code).join("-"),
    brand: {
      "@type": "Brand",
      name: "CMG Baldessarelli",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/catalogo/${product.categorySlug}/${product.slug}`,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "CMG Baldessarelli",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: `Breadcrumb Prodotto - ${product.name}`,
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
        item: `${siteUrl}/catalogo/${product.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${siteUrl}/catalogo/${product.categorySlug}/${product.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([breadcrumbSchema, productSchema]),
      }}
    />
  );
}

export async function generateMetadata({ params }) {
  const product = getProductData(params.productSlug);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const pageUrl = `/catalogo/${product.categorySlug}/${product.slug}`;
  const imageUrl = product.images[0]
    ? `${siteUrl}${product.images[0].src}`
    : null;

  return {
    title: `${product.name}`,
    description: product.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${product.name} | CMG Baldessarelli`,
      description: product.description,
      url: pageUrl,
      images: imageUrl ? [{ url: imageUrl, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | CMG Baldessarelli`,
      description: product.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = getProductData(params.productSlug);

  return (
    <>
      <ProductJsonLd product={product} />
      <main className={styles.productPage}>
        <section>
          <div className={styles.productPageHeading}>
            <div className="container">
              <h1>{product.name}</h1>
            </div>
          </div>
          <div className={styles.productPageContent}>
            <div className={`${styles.hiddenOnMobile} container`}>
              <div className={styles.productPageImages}>
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.name} - ${
                      index > 0 ? `vista ${index + 1}` : "vista principale"
                    }`}
                    width={500}
                    height={400}
                  />
                ))}
              </div>
            </div>
            <div className="container">
              <div className={styles.productPageInfo}>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                {product.informations && (
                  <table>
                    <caption>Varianti del prodotto</caption>
                    <thead>
                      <tr>
                        <th scope="col">Codice Articolo</th>
                        <th scope="col">Descrizione</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.informations.articles.map((article) => (
                        <tr key={article.code}>
                          <td className={styles.articleCode}>{article.code}</td>
                          <td>{article.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
