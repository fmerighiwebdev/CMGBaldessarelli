"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./image-slideshow.module.css";

export default function ImageSlideshow({ images, width, height, label }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const imageCount = images.length;
  const isAutoPlaying =
    imageCount > 1 && !isPaused && !prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentImage((previousImage) => (previousImage + 1) % imageCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageCount, isAutoPlaying]);

  if (imageCount === 0) {
    return null;
  }

  const showPreviousImage = () => {
    setIsPaused(true);
    setCurrentImage(
      (previousImage) => (previousImage - 1 + imageCount) % imageCount
    );
  };

  const showNextImage = () => {
    setIsPaused(true);
    setCurrentImage((previousImage) => (previousImage + 1) % imageCount);
  };

  const togglePlayback = () => {
    if (prefersReducedMotion) {
      return;
    }

    setIsPaused((previousState) => !previousState);
  };

  return (
    <div
      className={styles.slideshow}
      role="region"
      aria-roledescription="presentazione"
      aria-label={label}
    >
      <div className={styles.viewport}>
        {images.map((image, index) => {
          const isCurrentImage = index === currentImage;

          return (
            <div
              key={image.src}
              className={styles.slide}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} di ${imageCount}`}
              hidden={!isCurrentImage}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={width}
                height={height}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>

      {imageCount > 1 && (
        <div
          className={styles.controls}
          role="group"
          aria-label="Controlli presentazione immagini"
        >
          <button type="button" onClick={showPreviousImage}>
            Precedente
          </button>
          <button
            type="button"
            onClick={togglePlayback}
            aria-disabled={prefersReducedMotion}
          >
            {prefersReducedMotion
              ? "Riproduzione automatica disattivata"
              : isPaused
                ? "Riprendi"
                : "Pausa"}
          </button>
          <span className={styles.slideCount}>
            {currentImage + 1} / {imageCount}
          </span>
          <button type="button" onClick={showNextImage}>
            Successiva
          </button>
        </div>
      )}
    </div>
  );
}
