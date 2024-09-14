import React from "react";
import YellowButton from "../YellowButton/YellowButton";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface CardTestProps {
  elementCard: {
    id: number;
    idTest: string;
    title: string;
    imagen: StaticImageData | string;
  }
  resultadoDominante: any;
  resultadoGrafica: any;
  resultado: any;
}

const CardTest: React.FC<CardTestProps> = ({ elementCard }) => {
  const router = useRouter();

  const determineTestRoute = (idTest: string) => {
    let testRoute = "";

    switch (idTest) {
      case "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498":
        testRoute = "/dashboard/testJugador";
        break;
      case "d2556cb9-3cb7-42f3-8b69-b4341154dc1d":
        testRoute = "/dashboard/testLiderazgo";
        break;
      case "74eed584-ef28-434d-999f-f09636fc142c":
        testRoute = "/dashboard/testHabilidadesBlandas";
        break;
      default:
        testRoute = "";
    }

    return testRoute;
  };

  const handlePlayTest = () => {
    const testRoute = determineTestRoute(elementCard.idTest);
    if (testRoute) {
      router.push(testRoute);
    } else {
      console.error("No se encontró una ruta para el test.");
    }
  };

  return (
    <article className="relative py-2 px-[0.4rem] cursor-pointer bg-white border-1 border-black rounded-2xl min-w-48 w-48 h-72 min-h-72 md:min-h-0 md:h-[16.5rem] md:min-w-0 md:w-[11.3rem] flex flex-col justify-center items-center shadow-slate-500 shadow-sm transform transition-transform hover:scale-105">
      <div className="max-h-[5rem]">
        <Image
          src={elementCard?.imagen}
          alt="card image"
          className="w-full rounded-md object-cover"
        />
      </div>
      <div className="flex-col justify-center items-center shadow-md shadow-[#808080] rounded-2xl gap-2 w-full h-full max-h-[7.6rem] max-w-[12.5rem] md:max-h-[6.5rem] md:max-w-[12rem] bg-[#F8A748] mt-auto mb-1">
        <div className="w-full h-[50%] pt-2">
          <h2 className="text-slate-900 text-base md:text-[1rem] text-center font-semibold font-robotoMono capitalize mb-1">
            {elementCard?.title}
          </h2>
        </div>
        <div className="mx-auto h-[2.25rem] text-center w-[7rem]">
          <YellowButton onClick={handlePlayTest}>Jugar</YellowButton>
        </div>
      </div>
    </article>
  );
};

export default CardTest;
