"use client"

// app/ArtworkAndYear.js
import React, { useState, useEffect } from 'react';
import Yearbtn from '../app/year-btn';
import Artworks from '../app/artworks';

export default function ArtworkAndYear() {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [artworks, setArtworks] = useState([]); 

  useEffect(() => {
    const fetchArtworks = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/datafetcher?year=${selectedYear}`);
        const data = await res.json();
        setArtworks(data);
    }

    fetchArtworks();
  }, [selectedYear]);

  console.log(selectedYear);

  return (
    <div>
      <Yearbtn setSelectedYear={setSelectedYear} />
      {/* <Artworks artworks={artworks}></Artworks> */}
    </div>
  );
}