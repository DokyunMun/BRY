// app/year-btn.js
"use client";
import React, { useState, useEffect } from "react";
import Artworks from "./artworks";

export default function Yearbtn() {
  const [selectedYear, setSelectedYear] = useState([2023]);
  const [artworks, setArtworks] = useState([]);
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showyearsmenu = () => {
    const yearmenus = document.querySelectorAll(".yearbtn");
    if (yearmenus[0].style.display === "none") {
      yearmenus.forEach((menu, index) => {
        setTimeout(
          () => {
            menu.style.display = "flex";
          },
          10 * (index + 1),
        ); // index에 따라 지연 시간이 증가
      });
    } else {
      yearmenus.forEach((menu, index) => {
        setTimeout(
          () => {
            menu.style.display = "none";
          },
          10 * (index + 1),
        ); // index에 따라 지연 시간이 증가
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/yearfetcher`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const newYears = await res.json();
        setYears(newYears);
      } catch (error) {
        console.error("Fetch error:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/datafetcher?year=${selectedYear}`,
      );
      const newArtworks = await res.json();
      setArtworks(newArtworks);
    };

    fetchData();
  }, [selectedYear]);

  console.log(selectedYear);

  const uniqueYears = [...new Set(years.map((y) => y.year))];
  uniqueYears.reverse();

  const handleClick = async (year) => {
    window.currentSlide = 1;
    setSelectedYear(year);
    const yearmenus = document.querySelectorAll(".yearbtn");
    const artworks = document.querySelector("#artworks");
    artworks.style.left = "0";
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    if (right) {
      right.style.display = "flex";
    }
    left.style.display = "none";
    yearmenus.forEach((menu) => {
      menu.style.display = "none";
    });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Artworks artworks={artworks}></Artworks>
      <div
        id="years-con"
      >
        <div
          onClick={showyearsmenu}
          id="yeartitle"
        >
          {selectedYear}
          <svg
          id="svg"
          style={{paddingLeft:"2.5px"}}
            width="5"
            height="5"
            viewBox="0 0 5 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4L5 -1.79422e-07L3.49691e-07 -6.16536e-07L2.5 4Z"
            />
          </svg>
        </div>
        <div id="years-menu">
          {uniqueYears.map((year, index) => (
            <div
              className="yearbtn"
              style={{display:"none"}}
              value={year}
              key={index}
              onClick={() => handleClick(year)}
            >
              {year}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
