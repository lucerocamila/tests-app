import React from "react";
import {Progress} from "@nextui-org/react";
import { FontParrafo } from "@/app/ui/fonts";

interface ProgressBarProps {
  preguntaActual: number;
  totalPreguntas: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({preguntaActual, totalPreguntas}) => {
  const value = preguntaActual == totalPreguntas ? 100 : (preguntaActual / totalPreguntas) * 100;

  // console.log("preguntaActual ->", preguntaActual)
  // console.log("totalPreguntas ->", totalPreguntas)

  return (
    <Progress
      aria-label="Progreso"
      size="md"
      value={value}
      color="warning"
      showValueLabel={true}
      className={`${FontParrafo.className} max-w-md text-lg font-semibold text-guille_color4 `}
    />
  );
}

export default ProgressBar;