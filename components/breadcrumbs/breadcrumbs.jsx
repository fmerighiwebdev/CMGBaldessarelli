import Link from "next/link";

import styles from "./breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${item.href || index}`}>
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
