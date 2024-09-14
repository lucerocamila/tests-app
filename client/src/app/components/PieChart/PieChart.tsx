'use client'
import React, { useEffect, useRef } from 'react';
import './PieChart.css';

interface DataItem {
  name: string;
  value: number;
}

interface PieChartProps {
  data: DataItem[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const circleRef = useRef<SVGPathElement>(null);
  const percentageRef = useRef<SVGTextElement>(null);

  // Calcular la suma total de los valores
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    const circle = circleRef.current;
    const percentage = percentageRef.current;

    if (circle && percentage) {
      const circumference = circle.getTotalLength();

      let currentOffset = 0;
      // Iterar sobre los datos para dibujar cada porción del gráfico
      data.forEach(item => {
        const slicePercentage = (item.value / totalValue) * 100;
        const offset = circumference * (1 - slicePercentage / 100);

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = String(currentOffset);
        currentOffset -= offset;

        // Agregar etiqueta de porcentaje al centro de la porción
        const percentageText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        percentageText.textContent = `${item.name}: ${item.value}`;
        percentageText.setAttribute('x', '18');
        percentageText.setAttribute('y', '20.35');
        percentageText.setAttribute('class', 'percentage');
        percentage.appendChild(percentageText);
      });
    }
  }, [data, totalValue]);

  return (
    <div className="single-chart">
      <svg viewBox="0 0 36 36" className="circular-chart orange">
        <path className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path ref={circleRef} className="circle" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <g ref={percentageRef}></g>
      </svg>
    </div>
  );
};

export default PieChart;
