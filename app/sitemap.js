import { products } from "../utils/products.js";
import { news } from "../utils/news.js";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

const categories = [
  { slug: "tenditori" },
  { slug: "accessori-di-testata" },
  { slug: "collari-di-testata" },
  { slug: "collari-intermedi" },
  { slug: "cavallotti" },
  { slug: "accessori-speciali" },
];

export default function sitemap() {
  const today = new Date().toISOString().split("T")[0];
  const staticRoutes = [
    {
      url: `${baseURL}/`,
      changeFrequency: "yearly",
      lastModified: today,
      priority: 1,
    },
    {
      url: `${baseURL}/catalogo`,
      changeFrequency: "monthly",
      lastModified: today,
      priority: 0.8,
    },
    {
      url: `${baseURL}/news`,
      changeFrequency: "weekly",
      lastModified: today,
      priority: 0.8,
    },
    {
      url: `${baseURL}/contatti`,
      changeFrequency: "yearly",
      lastModified: today,
      priority: 0.6,
    },
    {
      url: `${baseURL}/privacy-cookie`,
      changeFrequency: "yearly",
      lastModified: today,
      priority: 0.4,
    },
  ];

  const categoryRoutes = categories.map((category) => ({
    url: `${baseURL}/catalogo/${category.slug}`,
    changeFrequency: "yearly",
    lastModified: today,
    priority: 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseURL}/catalogo/${product.categorySlug}/${product.slug}`,
    lastModified: product.lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const newsRoutes = news.map((newsItem) => ({
    url: `${baseURL}/news/${newsItem.slug}`,
    lastModified: newsItem.published_at,
    changeFrequency: "yearly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...newsRoutes];
}
