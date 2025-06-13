"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./image-slideshow.module.css";

export default function ImageSlideshow({ images, width, height }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentImage ? styles.active : ""
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            width={width}
            height={height}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
}
