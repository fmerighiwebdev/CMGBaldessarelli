import Image from "next/image";

import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import styles from "./privacy.module.css";

export const metadata = {
  title: "Privacy e Cookie Policy",
  description:
    "Consulta la nostra Privacy e Cookie Policy per informazioni sul trattamento dei dati personali e sull'uso dei cookie su CMG Baldessarelli.",
  robots: "noindex, follow",
  alternates: {
    canonical: "/privacy-cookie",
  },
};

export default function PrivacyPage() {
  return (
    <main className={styles.privacyPage}>
      <div className="container">
        <section>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy e Cookie Policy" },
            ]}
          />
          <div className={styles.privacyHeading}>
            <Image
              src="/images/logo-partial-black.svg"
              alt="CMG BALDESSARELLI Logo"
              width={100}
              height={50}
            />
            <h1>Privacy e Cookie Policy</h1>
          </div>
          <div className={styles.privacyContent}>
            <p>Ultimo aggiornamento: 13/06/2025</p>
            <div className={styles.privacyBlock}>
              <h2>1. Introduzione</h2>
              <p>
                La presente informativa descrive come raccogliamo, utilizziamo e
                proteggiamo i dati personali forniti dagli utenti tramite il
                nostro sito web. Siamo impegnati a garantire la protezione dei
                dati personali in conformità al Regolamento Generale sulla
                Protezione dei Dati (GDPR - Regolamento UE 2016/679) e ad altre
                normative applicabili.
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>2. Titolare del trattamento</h2>
              <p>
                Il titolare del trattamento dei dati è CMG BALDESSARELLI, con
                sede legale in Via Alcide Degasperi, 55 38060 - Villa Lagarina
                (TN), contattabile all&apos;indirizzo email:{" "}
                <a href="mailto:info@cmgbaldessarelli.it">
                  info@cmgbaldessarelli.it
                </a>
                .
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>3. Tipologia di dati raccolti</h2>
              <p>
                Attraverso il nostro modulo di contatto raccogliamo i seguenti
                dati personali:
              </p>
              <ul>
                <li>Nome</li>
                <li>Numero di telefono</li>
                <li>Email</li>
              </ul>
            </div>
            <div className={styles.privacyBlock}>
              <h2>4. Finalità del trattamento</h2>
              <p>
                I dati personali forniti vengono raccolti e trattati
                esclusivamente per le seguenti finalità:
              </p>
              <ul>
                <li>
                  Gestione delle richieste di contatto inviate dall’utente
                  tramite il modulo del sito.
                </li>
              </ul>
            </div>
            <div className={styles.privacyBlock}>
              <h2>5. Base giuridica del trattamento</h2>
              <p>
                l trattamento dei dati è basato sul consenso esplicito
                dell’utente fornito al momento dell’invio del modulo di
                contatto.
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>6. Modalità di trattamento dei dati</h2>
              <p>
                I dati personali sono trattati con strumenti elettronici e
                misure organizzative idonee a garantire la sicurezza e la
                riservatezza delle informazioni.
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>7. Conservazione dei dati</h2>
              <p>
                I dati saranno conservati per il tempo strettamente necessario a
                rispondere alla richiesta dell’utente e, successivamente, per il
                periodo necessario a rispettare eventuali obblighi legali.
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>8. Diritti dell’utente</h2>
              <p>L’utente ha diritto di:</p>
              <ul>
                <li>Accedere ai propri dati personali.</li>
                <li>Rettificare o cancellare i propri dati.</li>
                <li>Limitare il trattamento dei dati.</li>
                <li>Opporsi al trattamento.</li>
                <li>Revocare il consenso in qualsiasi momento</li>
                <li>
                  Presentare reclamo all’autorità di controllo competente.
                </li>
              </ul>
              <p>
                Per esercitare i propri diritti, l’utente può contattare il
                titolare del trattamento ai riferimenti indicati al punto 2.
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>9. Cosa sono i cookie</h2>
              <p>
                I cookie sono piccoli file di testo che il sito web invia al
                dispositivo dell’utente per migliorarne l’esperienza di
                navigazione. Alcuni cookie sono essenziali per il funzionamento
                del sito, mentre altri servono a raccogliere dati statistici o
                di marketing.
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>10. Tipologie di cookie utilizzati</h2>
              <p>Nel nostro sito utilizziamo:</p>
              <ul>
                <li>
                  Cookie tecnici: necessari per il corretto funzionamento del
                  sito.
                </li>
                <li>
                  Cookie analitici: utilizzati per raccogliere informazioni
                  statistiche anonime sull&apos;utilizzo del sito.
                </li>
              </ul>
            </div>
            <div className={styles.privacyBlock}>
              <h2>11. Gestione dei cookie</h2>
              <p>
                L&apos;utente può gestire le preferenze sui cookie attraverso le
                impostazioni del proprio browser:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647?hl=it"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Microsoft Edge
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.privacyBlock}>
              <h2>12. Consenso ai cookie</h2>
              <p>
                All&apos;accesso al sito, l&apos;utente può fornire o negare il
                consenso ai cookie non essenziali tramite il banner di gestione
                dei cookie.
              </p>
            </div>
            <div className={styles.privacyBlock}>
              <h2>13. Modifiche alla seguente Policy</h2>
              <p>
                Ci riserviamo il diritto di aggiornare questa policy in
                qualsiasi momento. Gli aggiornamenti saranno pubblicati su
                questa pagina.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
