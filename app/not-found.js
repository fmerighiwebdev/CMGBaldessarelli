import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Pagina non trovata",
  description:
    "Oops! La pagina che stai cercando non esiste. Torna alla home del sito web.",
  robots: "noindex, follow",
};

export default function NotFoundPage() {
  return (
    <main id="main-content" className={styles.notFoundPage}>
      <section>
        <div className={styles.notFoundHeading}>
          <h1>404</h1>
        </div>
        <div className={styles.notFoundContent}>
          <p>La pagina che stai cercando non esiste.</p>
        </div>
        <Link href="/">Torna alla home</Link>
      </section>
    </main>
  );
}
