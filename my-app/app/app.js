import React, { useState } from 'react';
import YearServer from './YearServer';
import ArtworksServer from './ArtworksServer';

export default function App() {
  const [year, setYear] = useState(null); // 연도를 저장할 상태

  return (
    <div>
      <YearServer setYear={setYear} /> // 연도를 업데이트하는 함수를 전달
      <ArtworksServer year={year} /> // 현재 연도를 전달
    </div>
  );
}