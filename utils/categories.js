export const categories = [
  {
    name: "Tenditori",
    slug: "tenditori",
    image: "/images/category/tenditori.webp",
    alt: "Tenditori professionali per fili da vigneto",
    intro:
      "Tenditori per fili da vigneto pensati per mantenere stabile la tensione degli impianti e semplificare gli interventi in campo.",
  },
  {
    name: "Accessori di Testata",
    slug: "accessori-di-testata",
    image: "/images/category/accessori-di-testata.webp",
    alt: "Accessori di testata per pali da vigna",
    intro:
      "Accessori di testata per collegamenti, fissaggi e supporti nelle strutture portanti del vigneto.",
  },
  {
    name: "Collari di Testata",
    slug: "collari-di-testata",
    image: "/images/category/collari-di-testata.webp",
    alt: "Collari di testata per la massima stabilita",
    intro:
      "Collari di testata per ancoraggi e collegamenti su pali quadrati, rotondi e configurazioni specifiche.",
  },
  {
    name: "Collari Intermedi",
    slug: "collari-intermedi",
    image: "/images/category/collari-intermedi.webp",
    alt: "Collari intermedi per pali da vigneto",
    intro:
      "Collari intermedi per sostenere traversine e cantinelle lungo l'impianto, con varianti singole, doppie e a corpo unico.",
  },
  {
    name: "Cavallotti",
    slug: "cavallotti",
    image: "/images/category/cavallotti.webp",
    alt: "Cavallotti e ganci per fili agricoli",
    intro:
      "Cavallotti per fissaggi tra pali, tubi e traversine, disponibili in sezioni e passi diversi.",
  },
  {
    name: "Accessori Speciali",
    slug: "accessori-speciali",
    image: "/images/category/accessori-speciali.webp",
    alt: "Accessori speciali e su misura per vigneto",
    intro:
      "Accessori speciali per esigenze particolari di impianto, aggancio e passaggio filo.",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug) {
  return (
    getCategoryBySlug(slug)?.name ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}
