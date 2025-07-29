'use client';

import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getEstimatedVsMeasuredEmissions } from "./api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Estimated vs. Measured Emissions',
    },
  },
};


export default function Home() {
  const [labels, setLabels] = useState<string[]>([]);
  const [estimatedValues, setEstimatedValues] = useState<number[]>([]);
  const [measuredValues, setMeasuredValues] = useState<number[]>([]);

  const updateGraph = async(e: React.ChangeEvent<HTMLSelectElement> | null) => {
    console.log('Fetching emissions data...');
    const orderByParam = e?.target?.value || 'yearAndMonth';
    const data = await getEstimatedVsMeasuredEmissions(orderByParam);
    console.log('Emissions data fetched:', data);
    setLabels(data.map(r => r.label));
    setEstimatedValues(data.map(r => r.estimatedResult));
    setMeasuredValues(data.map(r => r.measuredResult));
  };

  useEffect(() => {
    const fetchData = async () => {
      await updateGraph(null);
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-none">
        <Image
          src="/Project-Canary-Logo-2024@2x-160x37.webp"
          alt="Project Canary logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          Order By:
          <select
            onChange={updateGraph}
            defaultValue="yearAndMonth"
            className="border border-gray-300 rounded bg-white text-black px-2 py-1"
          >
            <option value="emissionSite">Emission Site</option>
            <option value="equipmentGroup">Equipment Group</option>
            <option value="yearAndMonth">Month</option>
          </select>
        </div>
        <div className="w-full h-[40vh] min-h-[300px] max-h-[600px] self-stretch">
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  label: 'Estimated',
                  data: estimatedValues,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Measured',
                  data: measuredValues,
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ],
            }}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Copyright Rob Alexander 2025
      </footer>
    </div>
  );
}
