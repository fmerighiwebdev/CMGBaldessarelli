import { products } from "../utils/products.js";
import { news } from "../utils/news.js";

const baseURL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

const categories = [
  { slug: "tenditori" },
  { slug: "accessori-di-testata" },
  { slug: "collari-di-testata" },
  { slug: "collari-intermedi" },
  { slug: "cavallotti" },
  { slug: "accessori-speciali" },
];

export default function sitemap() {
  const staticRoutes = [
    {
      url: `${baseURL}/`,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseURL}/catalogo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/news`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/contatti`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const categoryRoutes = categories.map((category) => ({
    url: `${baseURL}/catalogo/${category.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseURL}/catalogo/${product.categorySlug}/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const newsRoutes = news.map((newsItem) => ({
    url: `${baseURL}/news/${newsItem.slug}`,
    changeFrequency: "yearly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...newsRoutes];
}
