"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const navLinks = [
    { label: "Azienda", href: "/#about" },
    {
      label: "Accessori per il Vigneto",
      isDropdown: true,
      submenu: [
        {
          label: "Accessori di Testata",
          href: "/catalogo/accessori-di-testata",
        },
        { label: "Collari di Testata", href: "/catalogo/collari-di-testata" },
        { label: "Collari Intermedi", href: "/catalogo/collari-intermedi" },
        { label: "Cavallotti", href: "/catalogo/cavallotti" },
        { label: "Tenditori", href: "/catalogo/tenditori" },
        { label: "Accessori Speciali", href: "/catalogo/accessori-speciali" },
      ],
    },
    { label: "Contatti", href: "/contatti" },
    { label: "News", href: "/#news" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <div className="container">
        <nav className={styles.nav}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Homepage CMG Baldessarelli"
          >
            <Image
              src="/images/logo-partial-white.svg"
              alt="Logo CMG BALDESSARELLI"
              width={70}
              height={100}
            />
          </Link>

          <ul className={styles.desktopMenu}>
            {navLinks.map((link) => (
              <li
                key={link.label}
                onMouseLeave={() => link.isDropdown && setIsDropdownOpen(false)}
              >
                {link.isDropdown ? (
                  <>
                    <button
                      className={styles.dropdownButton}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onMouseOver={() => setIsDropdownOpen(true)}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                    >
                      {link.label}
                      <Image
                        src="/icons/down-arrow.svg"
                        alt=""
                        width={10}
                        height={10}
                      />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={styles.submenu}
                        >
                          {link.submenu.map((sublink) => (
                            <li key={sublink.href}>
                              <Link
                                href={sublink.href}
                                aria-current={
                                  pathname === sublink.href ? "page" : undefined
                                }
                              >
                                {sublink.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            className={styles.mobileMenu}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.isDropdown ? (
                    <details className={styles.mobileDropdown}>
                      <summary>{link.label}</summary>
                      <ul>
                        {link.submenu.map((sublink) => (
                          <li key={sublink.href}>
                            <Link
                              href={sublink.href}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sublink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
