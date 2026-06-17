import Image from "next/image";
import styles from "./about.module.css";

import ImageSlideshow from "../image-slideshow/image-slideshow";
import Link from "next/link";

export default function About() {
  const aboutSections = [
    {
      title: (
        <>
          <span>Innovazione</span> e <span>Personalizzazione</span> per
          l&apos;Agricoltura
        </>
      ),
      content:
        "CMG Baldessarelli è un'azienda giovane e dinamica con sede a Villa Lagarina, in provincia di Trento, che vanta una solida esperienza nella progettazione e costruzione di accessori per impianti agricoli, con un focus particolare sulla viticoltura a pergola. Grazie al nostro know-how e alla passione per il settore, offriamo soluzioni su misura per migliorare l'efficienza e la durata degli impianti, rispondendo alle esigenze specifiche di ogni cliente.",
      imageComponent: (
        <Image
          src="/images/chi-siamo-1.jpg"
          alt="Un membro del team CMG Baldessarelli al lavoro in officina su un pezzo di precisione."
          width={600}
          height={400}
        />
      ),
      imageOrder: "order-md-0",
    },
    {
      title: (
        <>
          Progettazione Avanzata e <span>Qualità Garantita</span>
        </>
      ),
      content:
        "Ogni progetto nasce dall'analisi accurata delle necessità del cliente, utilizzando software 3D e tecniche avanzate di produzione. Realizziamo accessori di altissima qualità, garantendo precisione, durabilità e affidabilità. La nostra gamma di prodotti è pensata per supportare l'imprenditore agricolo con soluzioni innovative e personalizzate, offrendo un'assistenza continua per il successo delle sue attività.",
      imageComponent: (
        <ImageSlideshow
          images={["/images/chi-siamo-2a.webp", "/images/chi-siamo-2b.webp"]}
          width={600}
          height={400}
        />
      ),
      imageOrder: "order-md-1",
    },
    {
      title: (
        <>
          <span>Efficienza</span> e <span>Sostenibilità</span> al Servizio del
          Cliente
        </>
      ),
      content:
        "Il nostro obiettivo è ridurre i costi di gestione e manutenzione degli impianti agricoli, migliorando al contempo sostenibilità ed efficienza operativa. Provenendo da una lunga tradizione agricola, comprendiamo profondamente le sfide del settore e lavoriamo ogni giorno per sviluppare soluzioni che rendano il lavoro nei vigneti più semplice, produttivo e redditizio.",
      imageComponent: (
        <Image
          src="/images/chi-siamo-3.webp"
          alt="Panoramica dell'area di produzione CMG Baldessarelli con macchinari."
          width={600}
          height={400}
        />
      ),
      imageOrder: "order-md-0",
    },
  ];

  return (
    <section className={styles.about} id="about">
      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.aboutContent}>
          {aboutSections.map((section, index) => (
            <div
              key={index}
              className={`row ${styles.aboutColumns} gap-3 gap-md-0 align-items-center`}
            >
              <div
                className={`col-12 col-md-6 ${
                  section.imageOrder === "order-md-1" ? "order-0" : "order-1"
                }`}
              >
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </div>
              <div
                className={`col-12 col-md-6 ${section.imageOrder}`}
              >
                {section.imageComponent}
              </div>
            </div>
          ))}
        </div>
        <Link href="/docs/Catalogo_CMG_2026.pdf" target="_blank" rel="noopener noreferrer" className={styles.catalogButton}>
          <Image src="/icons/pdf.svg" alt="Icona PDF" width={32} height={32} />
          <span>Vedi il Catalogo</span>
        </Link>
      </div>
    </section>
  );
}
