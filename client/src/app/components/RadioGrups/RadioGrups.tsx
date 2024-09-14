import React from "react";
import { useClientStore } from "@/store/TestJugadorStore/TestJugadorSrore";
import OptionButton from "../OptionButton/OptionButton";

interface Answer {
  id: string;
  description: string;
  points: number;
  type: string | null;
  isEmpty: boolean;
  isActive: boolean;
}

interface Props2 {
  options: Answer[];
}

const RenderRadioGroup: React.FC<Props2> = ({ options }) => {
  const { selectedOptions, setSelectedOptions } = useClientStore();

  const handleOptionClick = (type: string | null) => {
    // Si se hace clic en una opción que ya está seleccionada, no hacemos nada
    if (selectedOptions?.[0] === type) return;

    // Establecer el nuevo tipo seleccionado
    setSelectedOptions(type ? [type] : []);
  };
  // console.log(selectedOptions)
  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center text-guille_color1 px-1 md:px-4 max-w-[30rem]">
      {options.map((element, index) => {
        const isSelected = selectedOptions?.includes(element.type ?? "");
        
        return (
          <OptionButton
            key={index}
            text={element.description}
            items={"items-center justify-center"}
            isSelected={isSelected ?? false}
            onClick={() => {handleOptionClick(element.type)}}
          />)
        })}
    </div>
  );
};

export default RenderRadioGroup;