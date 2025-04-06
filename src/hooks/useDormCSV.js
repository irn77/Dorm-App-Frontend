// src/hooks/useDormCSV.js
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export default function useDormCSV() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/data/data2025.csv').then((res) => res.text()),
      fetch('/data/data2025Row.csv').then((res) => res.text()),
      fetch('/data/data2025Extra.csv').then((res) => res.text()),
    ]).then(([mainCSV, rowCSV, extraCSV]) => {
      const main = Papa.parse(mainCSV, { header: true, skipEmptyLines: true }).data;
      const row = Papa.parse(rowCSV, { header: true, skipEmptyLines: true }).data;
      const extra = Papa.parse(extraCSV, { header: true, skipEmptyLines: true }).data;

      // Combine: main → row → extra (in order of priority)
      const allDorms = [...main, ...row, ...extra];

      setCombinedData(allDorms);
    });
  }, []);

  return combinedData;
}
