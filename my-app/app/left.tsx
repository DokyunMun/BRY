// 'use client'
// import React, { useEffect } from 'react';

// export default function Left(){
//   const scrollArtworks = () => {
//     const artworks = document.getElementById('artworks');
//     if (artworks) {
//       artworks.scrollLeft -= window.innerWidth * 0.78;
//     }
//   };

//   // 임시로 스크롤위치 고정 이 파일에 넣어놓음..
//   // useEffect(() => {
//   //   const artworks = document.getElementById('artworks');
//   //   if (artworks) {
//   //     artworks.scrollLeft = window.innerWidth * 0.15;
//   //   }

//   // }, []);
//   return(
//     <div id="left"  onClick={scrollArtworks}>Prev.</div>
//   )
// }