import styles from "./news.module.css";
import { news } from "@/utils/news";

import Image from "next/image";
import Link from "next/link";

export default function News() {
  const latestNews = news.slice(0, 2);

  if (latestNews.length === 0) {
    return null;
  }

  return (
    <section className={styles.news} id="news">
      <h2>News</h2>
      <div className={styles.newsWrapper}>
        <div className={styles.greenLine}></div>
        <div className="container">
          <div
            className={`${styles.newsColumns} row gap-5 gap-md-0 justify-content-center`}
          >
            {latestNews.map((newsItem) => (
              <div key={newsItem.slug} className="col-12 col-md-6 col-lg-4">
                <div className={styles.newsItem}>
                  <h3>{newsItem.title}</h3>
                  <p>{newsItem.short_description}</p>
                  <div className={styles.newsLinks}>
                    <a
                      href={newsItem.ig_link}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      aria-label={`Guarda il video di "${newsItem.title}" su Instagram`}
                    >
                      Guarda il video
                      <Image
                        src="/icons/link-out.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </a>
                    <Link
                      href={`/news/${newsItem.slug}`}
                      aria-label={`Leggi la notizia completa su "${newsItem.title}"`}
                    >
                      Maggiori informazioni
                      <Image
                        src="/icons/link-out.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
