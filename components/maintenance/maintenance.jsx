import Image from "next/image";

import styles from "./maintenance.module.css";

export default function Maintenance() {
  return (
    <section className={styles.maintenance}>
      <Image src="/images/hero.webp" alt="Sito web in manutenzione" fill priority />
      <div className={styles.overlay}>
        <Image
          src="/images/logo-full-white.svg"
          alt="Logo"
          width={200}
          height={100}
        />
        <div className={styles.maintenanceContent}>
          <h1>Il nostro nuovo sito web è in fase di sviluppo.</h1>
          <h2>Tornate presto a trovarci!</h2>
        </div>
        <div className={styles.maintenanceContacts}>
          <a href="mailto:info@cmgbaldessarelli.it">
            <Image
              src="/icons/email.svg"
              alt="Invia un'email"
              width={32}
              height={32}
            />
            info@cmgbaldessarelli.it
          </a>
          <a href="tel:+393450219562">
            <Image
              src="/icons/phone.svg"
              alt="Chiamaci"
              width={32}
              height={32}
            />
            +39 345 0219562
          </a>
        </div>
      </div>
    </section>
  );
}
