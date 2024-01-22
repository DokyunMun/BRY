"use client";
import { useEffect, useState } from "react";

window.currentSlide = 1;
// let addSlide = 0;

export default function Right() {
  const [showRight, setShowRight] = useState(false);
  const [slides, setSlides] = useState([]);
 

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const slides = Array.from(document.querySelectorAll(".slide"));
      setSlides(slides);
      console.log(slides);
      console.log(slides.length);
      if (slides.length > 4) {
        setShowRight(true);
      } else {
        setShowRight(false);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);


  const scrollArtworks_right = () => {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const artworks = document.getElementById("artworks");
    const slides = Array.from(document.querySelectorAll(".slide")); 
   
      if (currentSlide == slides.length) {
        right.style.display = 'none';
      } 
      if (currentSlide == slides.length - 1) {
        right.style.display = 'none';
        artworks.style.left = `${currentSlide * -25}rem`;
        left.style.display = 'flex'
        currentSlide += 1;
        console.log(currentSlide)
      }
      else {
        artworks.style.left = `${currentSlide * -25}rem`;
        left.style.display = 'flex'
        currentSlide += 1;
        console.log(currentSlide)

        // const firstSlide = slides[addSlide].cloneNode(true);
        // addSlide += 1;
        // artworks.appendChild(firstSlide);
        // artworks.style.left = `${currentSlide * -25}rem`;
      }
    

  };

  const scrollArtworks_left = () => {
    const artworks = document.getElementById("artworks");
    const slides = Array.from(document.querySelectorAll(".slide"));
    const right = document.getElementById("right");
    const left = document.getElementById("left");


      if (currentSlide > 1) {
        currentSlide -= 1;
        artworks.style.left = `${(currentSlide-1) * -25}rem`;

        console.log(currentSlide)
        right.style.display = 'flex';
      } if(currentSlide == 1) {
        artworks.style.left = 0;
        left.style.display = 'none';
      }
  };


  return (
    <div id="side">
      {showRight && (
        <div id="right" className="btn" onClick={scrollArtworks_right}>
          Next
        </div>
      )}
      <div id="left" className="btn" onClick={scrollArtworks_left}>
        Prev.
      </div>
    </div>
  );
}
