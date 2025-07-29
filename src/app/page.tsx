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
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { getEstimatedVsMeasuredEmissions, getEquipmentGroups, getEmissionSites, getYearsAndMonths } from "./api";
import type { MeasuredVsEstimatedEmission, EquipmentGroup, EmissionSite, YearAndMonth } from "./api";

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Estimated',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Measured',
      data: [234, 34, 142, 123, 456, 789, 321],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

console.log(labels.map(() => faker.number.int({ min: 0, max: 1000 })))

export default function Home() {
  const [labels, setLabels] = useState<string[]>([]);
  const [estimatedValues, setEstimatedValues] = useState<number[]>([]);
  const [measuredValues, setMeasuredValues] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<'emissionSite' | 'equipmentGroup' | 'yearAndMonth'>('yearAndMonth');
  //const [equipmentGroups, setEquipmentGroups] = useState<EquipmentGroup[]>([]);
  //const [emissionSites, setEmissionSites] = useState<EmissionSite[]>([]);
  //const [yearsAndMonths, setYearsAndMonths] = useState<YearAndMonth[]>([]);
  const [error, setError] = useState<string | null>(null);

  const updateGraph = async(e) => {
    console.log('Fetching emissions data...');
    const orderByParam = e?.target?.value || orderBy;
    const data = await getEstimatedVsMeasuredEmissions(orderByParam);
    console.log('Emissions data fetched:', data);
    setLabels(data.map(r => r.label));
    setEstimatedValues(data.map(r => r.estimatedResult));
    setMeasuredValues(data.map(r => r.measuredResult));
  };

  useEffect(() => {
    const fetchData = async () => {
      //const equipmentGroups = await getEquipmentGroups();
      //setEquipmentGroups(equipmentGroups);

      //const emissionSites = await getEmissionSites();
      //setEmissionSites(emissionSites);

      //const yearsAndMonths = await getYearsAndMonths();
      //setYearsAndMonths(yearsAndMonths);

      await updateGraph(null);
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          cheese
          <select onChange={updateGraph} defaultValue="yearAndMonth">
            <option value="emissionSite">Emission Site</option>
            <option value="equipmentGroup">Equipment Group</option>
            <option value="yearAndMonth">Month</option>
            {/* {equipmentGroups.map(group => (
              <option key={group.equipmentGroupId} value={group.equipmentGroupId}>
                {group.name}
              </option>Month</option>
            ))} */}
          </select>

          {/* <select>
            <option value="">All Emission Sites</option>
            {emissionSites.map(site => (
              <option key={site.siteId} value={site.siteId}>
                {site.name}
              </option>
            ))}
          </select> */}

          {/* <select>
            <option value="">All Months</option>
            {yearsAndMonths.map(ym => (
              <option key={`${ym.year}-${ym.month}`} value={`${ym.year}-${ym.month}`}>
                {`${ym.year}/${ym.month}`}
              </option>
            ))}
          </select> */}
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

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
