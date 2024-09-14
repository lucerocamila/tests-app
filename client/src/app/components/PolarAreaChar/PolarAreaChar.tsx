"use client"
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { PolarArea } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale, 
  ArcElement, 
  Tooltip, 
  Legend
  );

interface Props {
  name: string;
  value: number;  
}
interface RenderChartProps {
  data: Props[];
  name: string;
}

export const RenderPolar: React.FC<RenderChartProps> = ({ data , name }) => {
  const areaData = {
  labels: data.map(obj => obj.name),
  // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

  datasets: [
    {
      label: `${name}`,
      data: data.map(obj => obj.value),
      // label: '# of Votes',
      // data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
}

  return (
    <div className='RenderRadar w-full aspect-square bg-white text-slate-700'>
      <PolarArea data={areaData} />
    </div>
  ) 
};

// export function RenderPolarArea() {
//   return <PolarArea data={RenderPolar} />;
// }
