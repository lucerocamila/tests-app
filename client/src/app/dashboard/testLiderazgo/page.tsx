"use client";
import React, { useEffect } from "react";
import ProgressBar from "@/app/components/ProgresBar/ProgresBar";
import YellowButton from "@/app/components/YellowButton/YellowButton";
import CircularProgresTime from "@/app/components/CircularProgresTime/CircularProgresTime";
import MyLoader from "@/app/components/Esqueletos/Esqueletos";
import RenderRadioGroupTest3 from "@/app/components/RadioGrupsTest3/RadioGrups";
import JuegoFinalizadoTestLiderazgo from "./components/juegoFinalizdoLiderazgo";
import { useLiderasgoStore } from "@/store/TestLiderazgoStore/TestLiderazgoStore";
import { fire } from "@/app/components/ConfettiCanvas/ConfettiCanvas";
import { generaCalculoRenderLiderazgo } from "@/app/utils/hellpersLiderazgo";
import TestContainer from "@/app/components/TestContainer/TestContainer";
import { UseAuthStore } from "@/store/AuthStore/AuthStore";

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
  } = useLiderasgoStore();
  const selectedOptionsArray = selectedOptions ?? [];

  const { user } = UseAuthStore();

  useEffect(() => {
    const testLiderazgo = user?.test?.find(
      (res) => res?.id === "d2556cb9-3cb7-42f3-8b69-b4341154dc1d"
    );
    testLiderazgo && setData(testLiderazgo.question ?? []);

    testLiderazgo &&
      setIdsTestsUsers({
        idUser: user?.id ?? "",
        idToken: user?.token ?? "",
        idTest: "d2556cb9-3cb7-42f3-8b69-b4341154dc1d",
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
        ...selectedOptionsArray.map((val) => ({
          type: val.type,
          points: val.points,
        })),
      ]);
      setSelectedOptions([]);
    } else {
      setFinalizo(true);
      resultado &&
        generaCalculoRenderLiderazgo(resultado, setResultRenderGrafica);
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  };

  console.log("data TestLiderazgo ->", data);

  const handleRestartQuiz = () => {
    setData(null);
    setFinalizo(false);
    setPreguntaActual(0);
    setResultado([]);
    setResultRenderGrafica([]);
    window.location.reload();
  };

  return (
    <main className="w-full min-h-screen relative px-1 flex flex-col justify-center items-center gap-6 md:gap-5">
      <TestContainer
        nextClick={handleNextQuestion}
        title="Liderazgo Transformacional"
      >
        {finalizo ? (
          <>
            <JuegoFinalizadoTestLiderazgo
              resultadoGrafica={resultRenderGrafica}
            />
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
                <RenderRadioGroupTest3
                  options={data[preguntaActual]?.answer}
                  typeFin={data[preguntaActual].typeQuestion}
                />
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
