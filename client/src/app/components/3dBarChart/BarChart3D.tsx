'use client'
import React, { useEffect } from "react";
import "./3dBarChart.css";

interface BarChartProps {
  data: number[]; 
  labels: string[]; 
  percentages: number[]; 
}

const BarChart3D: React.FC<BarChartProps> = ({ data, labels, percentages }) => {
  useEffect(() => {
    drawChart(data, percentages, "#chart", 10);
  }, [data, percentages]);

  const drawChart = (data: number[], percentages: number[], selector: string, padding: number) => {
    const max = Math.max(...data);
    const chart = document.querySelector(selector) as HTMLElement;
    const barWidth = ((chart.offsetWidth - (data.length - 1) * padding - data.length * 10) / data.length);
    let left = 0;

    chart.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const newBar = document.createElement('div');
      newBar.setAttribute("class", "bar");
      newBar.style.width = `${barWidth}px`;
      newBar.style.height = `${(data[i] / max) * 100}%`;
      newBar.style.left = `${left}px`;

      const text = document.createElement('div');
      text.setAttribute("class", "bar-text");
      text.textContent = `${percentages[i].toFixed(2)}%`;
      newBar.appendChild(text);

      chart.appendChild(newBar);
      left += (barWidth + padding + 15);
    }
  };

  return (
    <div className="wrapper">
      <div id="chart">
      </div>        
      <div className="flex w-full pl-1 sm:space-x-4 md:space-x-2 justify-start py-5 md:py-1 max-w-[300px] md:max-w-[380px]">
        {/* Renderizar etiquetas <p> dinámicamente */}
        {labels.map((label, index) => (
          <p className="flex w-full text-black font-bold text-xs md:text-sm mr-2 sm:mr-0" key={index}>{label}</p>
        ))}
      </div>
    </div>
  );
};

export default BarChart3D;
