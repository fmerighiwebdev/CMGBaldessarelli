import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { getCategoryName } from "@/utils/categories";
import { products } from "@/utils/products";
import styles from "./product-page.module.css";

export async function generateStaticParams() {
  return products.map((product) => ({
    categorySlug: product.categorySlug,
    productSlug: product.slug,
  }));
}

function getProductData(categorySlug, productSlug) {
  const product = products.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );
  if (!product) {
    notFound();
  }
  return product;
}

function getImageUrl(siteUrl, image) {
  return `${siteUrl}${image.src || image}`;
}

function ProductJsonLd({ product }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

  const categoryName = getCategoryName(product.categorySlug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => getImageUrl(siteUrl, image)),
    sku: product.informations.articles.map((a) => a.code).join("-"),
    brand: {
      "@type": "Brand",
      name: "CMG Baldessarelli",
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
  const { categorySlug, productSlug } = await params;
  const product = getProductData(categorySlug, productSlug);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const pageUrl = `/catalogo/${product.categorySlug}/${product.slug}`;
  const imageUrl = product.images[0]
    ? getImageUrl(siteUrl, product.images[0])
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
  const { categorySlug, productSlug } = await params;
  const product = getProductData(categorySlug, productSlug);
  const categoryName = getCategoryName(product.categorySlug);
  const relatedProducts = products
    .filter(
      (relatedProduct) =>
        relatedProduct.categorySlug === product.categorySlug &&
        relatedProduct.slug !== product.slug
    )
    .slice(0, 4);

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
            <div className="container">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Catalogo", href: "/catalogo" },
                  {
                    label: categoryName,
                    href: `/catalogo/${product.categorySlug}`,
                  },
                  { label: product.name },
                ]}
              />
            </div>
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
                <div className={styles.productActions}>
                  <Link href="/contatti" className={styles.primaryAction}>
                    Richiedi informazioni
                  </Link>
                  <Link
                    href={`/catalogo/${product.categorySlug}`}
                    className={styles.secondaryAction}
                  >
                    Vedi altri prodotti in {categoryName}
                  </Link>
                </div>
                {relatedProducts.length > 0 && (
                  <nav
                    className={styles.relatedProducts}
                    aria-label={`Altri prodotti in ${categoryName}`}
                  >
                    <h2>Prodotti correlati</h2>
                    <ul>
                      {relatedProducts.map((relatedProduct) => (
                        <li key={relatedProduct.slug}>
                          <Link
                            href={`/catalogo/${relatedProduct.categorySlug}/${relatedProduct.slug}`}
                          >
                            {relatedProduct.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
