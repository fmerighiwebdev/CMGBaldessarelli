import Image from "next/image";
import styles from "./footer.module.css";

import Link from "next/link";

export default function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={`row ${styles.footerColumns} gap-5 gap-md-0`}>
          <div className="col-12 col-md-4">
            <Image
              src="/images/logo-partial-white.svg"
              alt="CMG BALDESSARELLI Logo"
              width={70}
              height={100}
            />
            <address className={styles.footerAddress}>
              <p>
                <strong>CMG Baldessarelli</strong>
              </p>
              <p>Via Alcide Degasperi, 55</p>
              <p>38060 - Villa Lagarina (TN)</p>
              <p>
                <strong>P.IVA 02752280228</strong>
              </p>
            </address>
          </div>
          <div className={`col-12 col-md-4 ${styles.centeredCol}`}>
            <h2>Links utili</h2>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/catalogo">Catalogo Prodotti</Link>
              </li>
              <li>
                <Link href="/#about">Chi Siamo</Link>
              </li>
              <li>
                <Link href="/contatti">Contatti</Link>
              </li>
              <li>
                <Link href="/news">News</Link>
              </li>
              <li>
                <Link href="/privacy-cookie">Privacy e Cookie Policy</Link>
              </li>
            </ul>
          </div>
          <div className={`col-12 col-md-4 ${styles.centeredCol}`}>
            <a
              href="https://www.instagram.com/cmg_baldessarelli"
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label="Visita la nostra pagina Instagram"
            >
              <Image
                src="/icons/instagram.svg"
                width={48}
                height={48}
                alt=""
              />
            </a>
          </div>
        </div>
        <div className={styles.footerCopy}>
          <p>&copy; {currentYear} CMG Baldessarelli</p>
          <p>
            Made by:{" "}
            <a
              href="https://fmwebagency.it"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              FM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
