import React, { useEffect, useState } from "react";
import {CircularProgress} from "@nextui-org/react";

interface CircularProgresTimeProps {
  tiempo: number;
}

const CircularProgresTime: React.FC<CircularProgresTimeProps> = ({tiempo}) => {
  const [value, setValue] = useState(100);

  useEffect(() => {
    let startTime = Date.now()

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      // Calcular tiempo restante en milisegundos
      const remainingTime = tiempo * 60 * 100 - elapsedTime;
       // Calcular progreso en base al tiempo restante
      const progress = (remainingTime / (tiempo * 60 * 100)) * 100;
      setValue(progress);
    
      setValue((v) => (v >= 100 ? 100 : progress));
    }, 500);

    return () => clearInterval(interval);
  }, [tiempo]);

  

  return (
    <CircularProgress
      aria-label="Loading..."
      size="lg"
      value={value}
      color="warning"
      showValueLabel={true}
      // formatOptions={{ style: "unit", unit: "second" }} 
      className="w-full h-full text-guille_color1 font-semibold"
    />
  );
}

export default CircularProgresTime;
