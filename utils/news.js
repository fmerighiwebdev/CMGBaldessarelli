/**
 * @typedef {Object} NewsImage
 * @property {string} src
 * @property {string} alt
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} NewsItem
 * @property {string} slug
 * @property {string} title
 * @property {string} short_description
 * @property {string} description Plain-text description for metadata and JSON-LD.
 * @property {import("react").ReactNode} content Semantic JSX rendered in the article body.
 * @property {string} published_at
 * @property {string} [lastModified]
 * @property {string} [ig_link]
 * @property {NewsImage[]} images
 */

/** @type {NewsItem[]} */
export const news = [
  {
    slug: "bruciatore-anti-brina",
    title: "Proteggi le tue colture dal gelo con il Bruciatore Anti Brina",
    short_description:
      "Le gelate notturne mettono a rischio il tuo raccolto? Il Bruciatore Anti Brina offre una protezione efficace contro il gelo, garantendo calore uniforme e sicurezza per le coltivazioni. Scopri come funziona!",
    description:
      "Le basse temperature invernali possono compromettere irrimediabilmente il raccolto. Il Bruciatore Anti Brina è la risposta ideale per proteggere le coltivazioni dalle gelate notturne. Grazie alla sua struttura in acciaio resistente e all'alimentazione a pellet di legno, garantisce una diffusione uniforme del calore per molte ore, creando una barriera termica che previene danni da brina.",
    content: (
      <p>
        Le basse temperature invernali possono compromettere irrimediabilmente
        il raccolto. Il Bruciatore Anti Brina è la risposta ideale per
        proteggere le coltivazioni dalle gelate notturne. Grazie alla sua
        struttura in acciaio resistente e all&apos;alimentazione a pellet di
        legno, garantisce una diffusione uniforme del calore per molte ore,
        creando una barriera termica che previene danni da brina.
      </p>
    ),
    ig_link: "https://www.instagram.com/reel/DGVbTpHI2IO/",
    published_at: "2025-06-12",
    images: [
      {
        src: "/images/news/bruciatore-anti-brina.webp",
        alt: "Scheda tecnica del Bruciatore Anti Brina CMG Baldessarelli",
        width: 1131,
        height: 1600,
      },
      {
        src: "/images/news/bruciatore-anti-brina-2.webp",
        alt: "Schema di posizionamento dei bracieri antibrina nel vigneto",
        width: 1130,
        height: 1600,
      },
    ],
  },
  {
    slug: "contributi-ristrutturazione-riconversione-vigneti-2026-2027",
    title:
      "Contributi 2026/2027 per la ristrutturazione e riconversione dei vigneti",
    short_description:
      "Nuovi contributi per la campagna 2026/2027 dedicati alla ristrutturazione e riconversione dei vigneti, con sostegno fino al 50% dei costi standard riconosciuti.",
    description:
      "La campagna 2026/2027 prevede nuovi contributi destinati agli interventi di ristrutturazione e riconversione dei vigneti, con un sostegno economico pari al 50% dei costi standard riconosciuti per gli interventi ammessi. L'agevolazione rappresenta un'opportunità per le aziende vitivinicole che stanno valutando la realizzazione di un nuovo impianto, il reimpianto o l'adeguamento di un vigneto esistente.",
    content: (
      <>
        <p>
          La <strong>campagna 2026/2027</strong> prevede nuovi contributi
          destinati agli interventi di ristrutturazione e riconversione dei
          vigneti, con un sostegno economico pari al 50% dei costi standard
          riconosciuti per gli interventi ammessi.
        </p>
        <p>
          L&apos;agevolazione rappresenta un&apos;opportunità per le aziende
          vitivinicole che stanno valutando la realizzazione di un nuovo
          impianto, il reimpianto o l&apos;adeguamento di un vigneto esistente.
        </p>
        <h2>Quali interventi possono essere interessati</h2>
        <p>Gli interventi previsti comprendono:</p>
        <ul>
          <li>nuovi impianti;</li>
          <li>reimpianti;</li>
          <li>ristrutturazione e riconversione varietale dei vigneti.</li>
        </ul>
        <p>Il contributo può riguardare sia l&apos;impianto sia la relativa <strong>struttura di sostegno</strong>, comprese componenti come fili, ancoraggi, staffe e altri elementi necessari alla realizzazione del vigneto.</p>
        <h2>Quanto è possibile ottenere</h2>
        <p>Per gli impianti in terreno pianeggiante, i valori indicativi riportati dal bando prevedono:</p>
        <p style={{ margin: 0 }}><strong>Impianto a spalliera</strong></p>
        <p style={{ marginTop: 0 }}>Da 3.775 a 4.107 ceppi/ha:</p>
        <ul>
          <li>costo standard riconosciuto: <strong>€ 23.854/ha</strong>;</li>
          <li>contributo indicativo del 50%: <strong>€ 11.927/ha</strong>.</li>
        </ul>
        <p style={{ marginBottom: 0 }}><strong>Impianto a pergola</strong></p>
        <p style={{ marginTop: 0 }}>Fino a 3.251 ceppi/ha:</p>
        <ul>
          <li>costo standard riconosciuto: <strong>€ 32.729/ha</strong>;</li>
          <li>contributo indicativo del 50%: <strong>€ 16.364/ha</strong>.</li>
        </ul>
        <p>Sono inoltre riconosciuti costi standard per la realizzazione delle strutture di sostegno del vigneto. Nell&apos;esempio relativo a una pergola in terreno pianeggiante, il contributo può arrivare fino a € 12.089/ha, a fronte di un costo standard di € 24.178/ha.</p>
        <p>Gli importi riportati sono indicativi: il contributo effettivamente riconoscibile dipende dalla tipologia di intervento e dalle condizioni previste dal bando.</p>
        <h2>Scadenza della domanda</h2>
        <p>La scadenza indicata per la presentazione della domanda è: <strong>11 settembre 2026 alle ore 12:00</strong></p>
      </>
    ),
    published_at: "2026-09-04",
    images: [
      {
        src: "/images/news/nuovi-contributi-ristrutturazione-riconversione-vigneti.webp",
        alt: "Infografica sui contributi per ettaro e sui costi standard delle strutture per vigneto",
        width: 1644,
        height: 2048,
      },
      {
        src: "/images/news/nuovi-contributi-ristrutturazione-riconversione-vigneti-2.webp",
        alt: "Bando 2026/2027 per i contributi alla ristrutturazione e riconversione dei vigneti",
        width: 1644,
        height: 2048,
      },
      {
        src: "/images/news/nuovi-contributi-ristrutturazione-riconversione-vigneti-3.webp",
        alt: "Servizi CMG Baldessarelli per nuovi impianti, reimpianti e ristrutturazione dei vigneti",
        width: 1644,
        height: 2048,
      },
    ],
  },
];
