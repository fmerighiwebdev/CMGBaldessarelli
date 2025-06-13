const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmgbaldessarelli.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
