"use client";
import React, { useEffect, useState } from "react";
import TestContainer from "@/app/components/TestContainer/TestContainer";
import OptionButton from "@/app/components/OptionButton/OptionButton";
import CircularProgresTime from "@/app/components/CircularProgresTime/CircularProgresTime";
import ResultScreen from "./result/ResultScreen";
import YellowButton from "@/app/components/YellowButton/YellowButton";
import { useHabilidadesBlandasStore } from "@/store/TestHabilidadesStore/TestHabilidadesStore";
import { UseAuthStore } from "@/store/AuthStore/AuthStore";
import ProgressBar from "@/app/components/ProgresBar/ProgresBar";
import { fire } from "@/app/components/ConfettiCanvas/ConfettiCanvas";

const TestHabilidadesBlandas = () => {
  const { user } = UseAuthStore();

  const {
    data,
    setData,
    finalizo,
    preguntaActual,
    resultado,
    resultRenderGrafica,
    setFinalizo,
    setPreguntaActual,
    setResultado,
    setResultRenderGrafica,
    pillarScores,
    setPillarScores,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setIdsTestsUsers,
  } = useHabilidadesBlandasStore();

  const [selectedOptions, setSelectedOptions] = useState<
    { type: string; points: number }[]
  >([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const storedIndex = localStorage.getItem("currentQuestionIndex");
    if (storedIndex) {
      setCurrentQuestionIndex(parseInt(storedIndex));
    }
  }, [setCurrentQuestionIndex]);

  useEffect(() => {
    const testHabilidadesBlandas = user?.test?.find(
      (res) => res?.id === "74eed584-ef28-434d-999f-f09636fc142c"
    );
    if (testHabilidadesBlandas) {
      setData(testHabilidadesBlandas?.question ?? []);
      setIdsTestsUsers({
        idUser: user?.id ?? "",
        idToken: user?.token ?? "",
        idTest: "74eed584-ef28-434d-999f-f09636fc142c",
      });
    }
  }, [user, setData, setIdsTestsUsers]);

  const handleAnswerSelection = (
    index: number,
    score: number,
    typeQuestion: string
  ) => {
    setSelectedAnswerIndex(index);
    if (typeQuestion === "Habilidades de liderazgo") {
      setPillarScores({
        ...pillarScores,
        leadership: pillarScores.leadership + score,
      });
    } else if (typeQuestion === "Habilidades personales") {
      setPillarScores({
        ...pillarScores,
        personalSkills: pillarScores.personalSkills + score,
      });
    } else if (typeQuestion === "Habilidades profesionales") {
      setPillarScores({
        ...pillarScores,
        professionalSkills: pillarScores.professionalSkills + score,
      });
    } else if (typeQuestion === "HL Y HP") {
      setPillarScores({
        ...pillarScores,
        leadership: pillarScores.leadership + score,
        professionalSkills: pillarScores.professionalSkills + score,
      });
    }
  };

  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      preguntaActual + 1 < (data?.length ?? 0) &&
      currentQuestionIndex + 1 > 0 &&
      currentQuestionIndex + 1 < 58
    ) {
      setSelectedAnswerIndex(null);
      setResultado([
        ...(resultado ?? []),
        ...selectedOptions.map((val) => ({
          type: val.type,
          points: val.points,
        })),
      ]);
      setSelectedOptions([]);
      setPreguntaActual(preguntaActual + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinalizo(true);
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  };
  

  const handleRestartQuiz = () => {
    setData([]);
    setFinalizo(false);
    setPreguntaActual(0);
    setResultado([]);
    setResultRenderGrafica([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    window.location.reload();
  };

  return (
    <main className="w-full min-h-screen md:pt-0 px-1 flex flex-col justify-center items-center gap-4 md:min-w-[56rem]">
      <TestContainer nextClick={handleNextQuestion} title="Habilidades Blandas">
        {finalizo ? (
          <>
            <ResultScreen
              pillarScores={pillarScores}
              resultRenderGrafica={resultRenderGrafica}
              restartQuiz={handleRestartQuiz}
              data={{
                mostProminentSkill: "",
                percentages: [],
              }}
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
            <section className="flex flex-col items-center">
              {data && data.length > 0 && (
                <>
                  <div className="flex justify-center items-center min-h-[4rem] w-full px-3 mt-2">
                    <ProgressBar
                      preguntaActual={currentQuestionIndex}
                      totalPreguntas={data?.length ?? 0}
                    />
                  </div>
                  <div className="flex justify-center items-center text-center min-h-[7rem] w-full px-6 my-6">
                    <p className="text-lg font-robotoMono text-black">
                      {data[currentQuestionIndex]?.description}
                    </p>
                  </div>
                </>
              )}
              <div className="mb-2 px-4">
                {data &&
                  data.length > 0 &&
                  data[currentQuestionIndex]?.answer?.map((answer, index) => (
                    <div key={index} className="mb-2">
                      <OptionButton
                        items="items-center"
                        text={answer.description}
                        isSelected={selectedAnswerIndex === index}
                        onClick={() =>
                          handleAnswerSelection(
                            index,
                            answer.points,
                            data[currentQuestionIndex]?.typeQuestion
                          )
                        }
                      />
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}
      </TestContainer>
    </main>
  );
};

export default TestHabilidadesBlandas;
