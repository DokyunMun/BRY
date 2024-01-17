"use client";
import { useEffect } from "react";

let currentSlide = 0;
let addSlide = 0;

export default function Right() {
  const scrollArtworks_right = () => {
    const artworks = document.getElementById("artworks");
    const slides = Array.from(document.querySelectorAll(".slide"));
    currentSlide += 1;

    if (currentSlide < slides.length - 4) {
      artworks.style.left = `${currentSlide * -25}rem`;
    } else {
      const firstSlide = slides[addSlide].cloneNode(true);
      addSlide += 1;
      artworks.appendChild(firstSlide);
      artworks.style.left = `${currentSlide * -25}rem`;
    }
  };

  const scrollArtworks_left = () => {
    const artworks = document.getElementById("artworks");
    const slides = Array.from(document.querySelectorAll(".slide"));

    if (currentSlide > 1) {
      currentSlide -= 1;
      const style = getComputedStyle(artworks);
      const currentLeft = parseFloat(style.left);
      console.log(currentLeft);
      artworks.style.left = `${currentLeft + 25 * 16}px`;
    } else {
      currentSlide = 0;
    }
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     scrollArtworks_right();
  //     scrollArtworks_left();
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div id="side">
      <div id="right" onClick={scrollArtworks_right}>
        Next
      </div>
      <div id="left" onClick={scrollArtworks_left}>
        Prev.
      </div>
    </div>
  );
}
