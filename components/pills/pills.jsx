import styles from "./pills.module.css";

import Image from "next/image";

export default function Pills() {
  const pillsData = [
    {
      iconSrc: "/icons/quality.svg",
      title: "Materie Prime di Qualità",
      text: "I nostri accessori nascono da una rigorosa selezione delle migliori materie prime disponibili sul mercato.",
    },
    {
      iconSrc: "/icons/bulb.svg",
      title: "Innovazione e Tecnologie",
      text: "Investiamo costantemente in ricerca e sviluppo per portare innovazione nel settore agricolo.",
    },
    {
      iconSrc: "/icons/leaf.svg",
      title: "Sostenibilità ed Efficienza",
      text: "Creiamo prodotti che rispettano l'ambiente e aiutano gli imprenditori agricoli a ottimizzare le risorse, riducendo gli sprechi e i costi di gestione.",
      className: "mt-md-5 mt-lg-0",
    },
    {
      iconSrc: "/icons/handshake.svg",
      title: "Consulenza e Assistenza",
      text: "Affianchiamo i nostri clienti in ogni fase, dalla progettazione alla manutenzione degli impianti.",
      className: "mt-md-5 mt-lg-0",
    },
  ];

  return (
    <section className={styles.pills}>
      <div className="container">
        <h2 className="visuallyHidden">I Nostri Punti di Forza</h2>
        <div
          className={`${styles.pillsColumns} row gap-5 gap-md-0`}
        >
          {pillsData.map((pill, index) => (
            <div
              key={index}
              className={`col-12 col-md-6 col-lg-3 ${pill.className || ""}`}
            >
              <div className={styles.pill}>
                <Image
                  src={pill.iconSrc}
                  alt=""
                  width={100}
                  height={100}
                />
                <h3>{pill.title}</h3>
                <p>{pill.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
