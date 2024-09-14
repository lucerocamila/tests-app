"use client";
import React, { useEffect } from "react";
import RenderRadioGroup from "@/app/components/RadioGrups/RadioGrups";
import ProgressBar from "@/app/components/ProgresBar/ProgresBar";
import CircularProgresTime from "@/app/components/CircularProgresTime/CircularProgresTime";
import MyLoader from "@/app/components/Esqueletos/Esqueletos";
import JuegoFinalizado from "./components/juegoFinalizdo";
import { generaCalculoRender } from "../../utils/helpers";
import { fire } from "@/app/components/ConfettiCanvas/ConfettiCanvas";
import { useClientStore } from "@/store/TestJugadorStore/TestJugadorSrore";
import TestContainer from "@/app/components/TestContainer/TestContainer";
import ModalFinTest from "@/app/components/ModalFinTest/ModalFinTest";
import { UseAuthStore } from "@/store/AuthStore/AuthStore";
import YellowButton from "@/app/components/YellowButton/YellowButton";

export default function Page() {
  const {
    data,
    setData,
    selectedOptions,
    setSelectedOptions,
    finalizo,
    setFinalizo,
    preguntaActual,
    setPreguntaActual,
    resultado,
    setResultado,
    resultRenderGrafica,
    setResultRenderGrafica,
    setIdsTestsUsers,
  } = useClientStore();
  const selectedOptionsArray = selectedOptions ?? [];

  const { user } = UseAuthStore();

  useEffect(() => {
    const testJugador = user?.test?.find(
      (res) => res?.id === "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498"
    );
    testJugador && setData(testJugador.question ?? []);

    testJugador &&
      setIdsTestsUsers({
        idUser: user?.id ?? "",
        idToken: user?.token ?? "",
        idTest: "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498",
      });
  }, [setData, user, setIdsTestsUsers]);

  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      preguntaActual + 1 < (data?.length ?? 0) &&
      resultado &&
      resultado?.length <= (data?.length ?? 0)
    ) {
      setPreguntaActual(preguntaActual + 1);
      setResultado([
        ...resultado,
        ...selectedOptionsArray.map((val) => ({ val })),
      ]);
      setSelectedOptions([]);
    } else {
      setFinalizo(true);
      resultado && generaCalculoRender(resultado, setResultRenderGrafica);
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  };

  const objetoPruebas = {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd"/></svg>',
    text: "Haz concluido el test con éxito! Tus resultados se guardaran en tu perfil.",
    buttonName: "continuar",
  };

  const handelFuncionPruebas = () => {
    console.log("probando 123");
  };

  const handleRestartQuiz = () => {
    setData(null);
    setFinalizo(false);
    setPreguntaActual(0);
    setResultado([]);
    setResultRenderGrafica([]);
    window.location.reload();
  };
  return (
    <main className="w-full min-h-screen relative px-1 flex flex-col justify-center items-center gap-5">
      <TestContainer nextClick={handleNextQuestion} title="Estilos de jugador">
        {finalizo ? (
          <>
              <JuegoFinalizado resultadoGrafica={resultRenderGrafica} />            
              <div className="w-full max-w-[10rem] mx-auto">
              <YellowButton onClick={handleRestartQuiz}>
                Volver a Jugar
              </YellowButton>
            </div>
          </>
        ) : (
          <>
            <section className="tiempo absolute -top-6 left-[30px]">
              <CircularProgresTime tiempo={40} />
            </section>
            {data && data.length > 0 ? (
              <>
                <div className="flex justify-center w-full px-3">
                  <ProgressBar
                    preguntaActual={preguntaActual}
                    totalPreguntas={data?.length ?? 0}
                  />
                </div>
                <div className="flex justify-center items-center h-[7rem] m-4">
                  <h2 className={`text-lg font-robotoMono text-black`}>
                    {data[preguntaActual]?.description}
                  </h2>
                </div>
                <RenderRadioGroup options={data[preguntaActual]?.answer} />
              </>
            ) : (
              <section className="w-full h-[315px] flex justify-center items-center overflow-hidden">
                <MyLoader />
              </section>
            )}
          </>
        )}
      </TestContainer>
    </main>
  );
}
