import Image from "next/image";
import Link from "next/link";

import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}>
        <Image
          src="/images/hero.webp"
          fill
          priority
          alt="CMG BALDESSARELLI - Soluzioni per l'Agricoltura"
        />
        <div></div>
      </div>
      <div className={styles.heroContent}>
        <Image
          src="/images/logo-full-white.svg"
          alt="CMG BALDESSARELLI - Soluzioni per l'Agricoltura"
          width={200}
          height={100}
          className={styles.logo}
          priority
        />
        <div className={styles.ctaButtons}>
          <Link href="/catalogo" className={styles.ctaButton}>
            Esplora i Prodotti
          </Link>
        </div>
        <div className={styles.visuallyHidden}>
          <h1 className={styles.title}>
            CMG BALDESSARELLI - Accessori e Soluzioni per l&apos;Agricoltura
          </h1>
        </div>
      </div>
      <div className={styles.arrow}>
        <Link href="#about">
          <Image
            src="/icons/down-arrow.svg"
            alt="Scopri di più su CMG Baldessarelli"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </section>
  );
}
