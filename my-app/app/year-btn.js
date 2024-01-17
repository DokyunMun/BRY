import React, { useState, useEffect } from 'react';
import DataFetcher from './datafetcher.tsx';

export default function Yearbtn({ years }) {
  const [selectedYear, setSelectedYear] = useState(null);
  const uniqueYears = [...new Set(years.map(y => y.year))];
  uniqueYears.reverse();

  const handleClick = (year) => {
    setSelectedYear(year);
  }

  useEffect(() => {
    if (selectedYear) {
      DataFetcher(selectedYear);
    }
  }, [selectedYear]);

  return (
    <div>
      {uniqueYears.map((year, index) => (
        <button value={year} key={index} onClick={() => handleClick(year)}>{year}</button>
      ))}
    </div>
  );
}