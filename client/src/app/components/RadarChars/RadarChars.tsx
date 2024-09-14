import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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


const RadarChart: React.FC<RenderChartProps> = ({ data , name }) => {
  const chartData = {
    labels: data.map(obj => obj.name),
    datasets: [
      {
        label: `${name}`,
        data: data.map(obj => obj.value),
        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
        // borderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        borderColor: 'rgb(255, 130, 0)',
        pointBackgroundColor: 'rgb(255, 130, 0)',
        pointBorderColor: 'rgb(255, 130, 0)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 130, 0)',
        pointBorderWidth: 2,
        borderWidth: 2,
        pointHitRadius: 50,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        //pointStyle: 'cross',
        //pointStyle: 'crossRot',
        //pointStyle: 'dash',
        //pointStyle: 'line',
        //pointStyle: 'rect',
        //pointStyle: 'rectRounded',
        //pointStyle: 'rectRot',
        //pointStyle: 'star',
        //pointStyle: 'triangle',
        //pointStyle: false,
      }
    ],
  };
  const options = {
    scales: {
      r: {
        grid: {
          color: 'gray',
        },
      },
    },
  };

  
  return (
    <div className='RenderRadar w-full aspect-square bg-white text-black'>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
