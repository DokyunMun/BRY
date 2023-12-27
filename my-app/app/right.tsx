'use client'
import { useEffect } from 'react';

let currentSlide = 0;


export default function Right(){

  const scrollArtworks_right = () => {
    const artworks = document.getElementById('artworks');
    const slides = Array.from(document.querySelectorAll('.slide'));
    currentSlide += 4;
    artworks.style.overflowX="scroll"
    if (currentSlide < slides.length){
      const targetSlide = slides[currentSlide];
      const targetPosition = targetSlide.getBoundingClientRect().left + artworks.scrollLeft ;
      artworks.scrollLeft = targetPosition;
    } else {currentSlide = slides.length}; 
    console.log(currentSlide);
    artworks.style.overflowX="hidden"
  };

  const scrollArtworks_left = () => {
    const artworks = document.getElementById('artworks');
    const slides = Array.from(document.querySelectorAll('.slide'));
    artworks.style.overflowX="scroll"

    if (currentSlide > 4){
      currentSlide -= 4;
      const targetSlide = slides[currentSlide];
      const targetPosition = targetSlide.getBoundingClientRect().left + artworks.scrollLeft ;
      artworks.scrollLeft = targetPosition;
      console.log(currentSlide);
    } else {
      currentSlide = 0;
      const targetSlide = slides[currentSlide];
      const targetPosition = targetSlide.getBoundingClientRect().left + artworks.scrollLeft ;
      artworks.scrollLeft = targetPosition;
    };
    artworks.style.overflowX="hidden"
  };

  useEffect(() => {
    const handleResize = () => {
      scrollArtworks_right();
      scrollArtworks_left();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return(
    <div id="side">
      <div id="right" onClick={scrollArtworks_right}>Next</div>
      <div id="left"  onClick={scrollArtworks_left}>Prev.</div>
    </div>
  )
}
