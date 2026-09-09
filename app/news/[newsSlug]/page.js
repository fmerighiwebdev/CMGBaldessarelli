import Image from "next/image";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { news } from "@/utils/news";
import styles from "./newsPage.module.css";

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
    image: newsItem.images.map((image) => `${siteUrl}${image.src}`),
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
  const { newsSlug } = await params;
  const newsItem = getNewsData(newsSlug);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";
  const primaryImage = newsItem.images[0];
  const imageUrl = primaryImage ? `${siteUrl}${primaryImage.src}` : null;

  return {
    title: `${newsItem.title}`,
    description: newsItem.description,
    alternates: {
      canonical: `/news/${newsItem.slug}`,
    },
    openGraph: {
      title: newsItem.title,
      description: newsItem.description,
      url: `/news/${newsItem.slug}`,
      images: imageUrl ? [{ url: imageUrl, alt: primaryImage.alt }] : [],
      type: "article",
      publishedTime: newsItem.published_at,
      modifiedTime: newsItem.lastModified || newsItem.published_at,
      authors: ["CMG Baldessarelli"],
    },
  };
}

export default async function NewsPage({ params }) {
  const { newsSlug } = await params;
  const currentNews = getNewsData(newsSlug);

  return (
    <>
      <ArticleJsonLd newsItem={currentNews} />
      <BreadcrumbJsonLd newsItem={currentNews} />
      <main id="main-content" className={styles.newsPage}>
        <article>
          <div className={styles.newsHeading}>
            <div className="container">
              <h1>{currentNews.title}</h1>
            </div>
          </div>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "News", href: "/news" },
                { label: currentNews.title },
              ]}
            />
            <div className={styles.newsContent}>{currentNews.content}</div>
            {currentNews.images.length > 0 && (
              <div className={styles.newsImagesContainer}>
                {currentNews.images.map((image) => (
                  <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 768px) calc(100vw - 2rem), 800px"
                  />
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
