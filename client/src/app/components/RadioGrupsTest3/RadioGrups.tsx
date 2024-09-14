import React from "react";
import { useLiderasgoStore } from "@/store/TestLiderazgoStore/TestLiderazgoStore";
import OptionButton from "../OptionButton/OptionButton";

interface Answer {
  id: string;
  description: string;
  points: number;
  type: string | null;
  isEmpty: boolean;
  isActive: boolean;
}

interface Props {
  options: Answer[];
  typeFin: string
}

const RenderRadioGroupTest3: React.FC<Props> = ({ options, typeFin }) => {
  const { selectedOptions, setSelectedOptions } = useLiderasgoStore();

  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center text-guille_color1 px-1 md:px-4 max-w-[30rem]">
      {options?.map((element, index) => {
        const isSelected = selectedOptions?.some(
          (opt) => opt.type === typeFin && opt.points === element.points
        );

        return (
          <OptionButton
            key={index}
            text={element.description}
            items={"items-center justify-center"}
            isSelected={isSelected ?? false}
            onClick={() => {
              setSelectedOptions(
                isSelected
                  ? []
                  : [{ type: typeFin , points: element.points }]
              );
            }}
          />
        );
      })}
    </div>
  );
};

export default RenderRadioGroupTest3;
