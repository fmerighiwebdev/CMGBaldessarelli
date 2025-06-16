import Image from "next/image";
import styles from "./newsPage.module.css";
import { news } from "@/utils/news";

export async function generateStaticParams() {
  return news.map((n) => ({
    newsSlug: n.slug,
  }));
}

function getNewsData(slug) {
  const currentNews = news.find((n) => n.slug === slug);

  if (!currentNews) {
    notFound();
  }
  return currentNews;
}

function ArticleJsonLd({ newsItem }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/news/${newsItem.slug}`,
    },
    headline: newsItem.title,
    description: newsItem.description,
    image: newsItem.images.map((img) => `${siteUrl}${img}`),
    author: {
      "@type": "Organization",
      name: "CMG Baldessarelli",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CMG Baldessarelli",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo-full-black.svg`,
      },
    },
    datePublished: newsItem.published_at,
    dateModified: newsItem.lastModified || newsItem.published_at,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbJsonLd({ newsItem }) {
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
      {
        "@type": "ListItem",
        position: 3,
        name: newsItem.title,
        item: `${siteUrl}/news/${newsItem.slug}`,
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
  const newsItem = getNewsData(params.newsSlug);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const imageUrl = newsItem.images[0]
    ? `${siteUrl}${newsItem.images[0]}`
    : null;

  return {
    title: `${newsItem.title} | CMG Baldessarelli News`,
    description: newsItem.description,
    alternates: {
      canonical: `/news/${newsItem.slug}`,
    },
    openGraph: {
      title: newsItem.title,
      description: newsItem.description,
      url: `/news/${newsItem.slug}`,
      images: imageUrl ? [{ url: imageUrl, alt: newsItem.alt }] : [],
      type: "article",
      publishedTime: newsItem.published_at,
      modifiedTime: newsItem.lastModified || newsItem.published_at,
      authors: ["CMG Baldessarelli"],
    },
  };
}

export default async function NewsPage({ params }) {
  const currentNews = getNewsData(params.newsSlug);

  return (
    <>
      <ArticleJsonLd newsItem={currentNews} />
      <BreadcrumbJsonLd newsItem={currentNews} />
      <main id="main-content" className={styles.newsPage}>
        <section>
          <div className={styles.newsHeading}>
            <div className="container">
              <h1>{currentNews.title}</h1>
            </div>
          </div>
          <div className="container">
            <p className={styles.newsDescription}>{currentNews.description}</p>
            {currentNews.images.length > 0 && (
              <div className={styles.newsImagesContainer}>
                <Image
                  src={currentNews.images[0]}
                  alt={currentNews.alt}
                  width={1200}
                  height={1800}
                />
                <Image
                  src={currentNews.images[1]}
                  alt={currentNews.alt}
                  width={1200}
                  height={1800}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
