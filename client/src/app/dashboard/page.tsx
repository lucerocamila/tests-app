"use client";
import React, { useEffect, useState } from "react";
import CardTest from "../components/CardTest/CardTest";
import UserCard from "../components/UserCard/UserCard";
import imagenEstJugador from "@/img/home_estiloJugador.png";
import imagenHabilidades from "@/img/home_habilidades.png";
import imagenLiderazgo from "@/img/home_liderazgo.png";
import { UseAuthStore } from "@/store/AuthStore/AuthStore";
import RotatingQuadSpinner from "../components/RotatingQuadSpinner";

const Dashboard = () => {
  const [move, setMove] = useState(1);
  const { user, setUser } = UseAuthStore();
  const [hasCompletedTests, setHasCompletedTests] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cardsPrecargadas = [
    {
      id: 1,
      idTest: "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498",
      title: "estilo de jugador",
      imagen: imagenEstJugador,
    },
    {
      id: 2,
      idTest: "74eed584-ef28-434d-999f-f09636fc142c",
      title: "habilidades blandas",
      imagen: imagenHabilidades,
    },
    {
      id: 3,
      idTest: "d2556cb9-3cb7-42f3-8b69-b4341154dc1d",
      title: "liderazgo transformacional",
      imagen: imagenLiderazgo,
    },
  ];

  const objectUser = {
    id: user?.id || "",
    email: user?.email || "",
    fullName: user?.fullName || "",
    testHabilitado: user?.test,
    // renderGrafica?: user?.results[0].result_grafica || '',
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    if (user && user.test && user.test.length > 0) {
      setHasCompletedTests(true);
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 760) {
        setMove(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log("move ->", move)
  return (
    <section className="mainDashboard w-full h-auto min-h-screen py-10 md:p-5 flex flex-col md:justify-around items-center gap-1 md:gap-1">
      {(
        <>
          <div className="flex justify-center items-center h-[25rem] md:h-[15rem] w-full">
            {objectUser ? (
              <UserCard
                usuario={objectUser}
                onProfileClick={() =>
                  console.log("Ver informacion de mi perfil")
                }
                onChartClick={() => console.log("Ver grafico polar")}
              />
            ) : null}
          </div>
          {hasCompletedTests ? (
            <section
              className={`w-full h-[22rem] px-2 py-1 flex justify-start items-center md:justify-center md:items-center gap-5 max-w-[25rem] md:max-w-none overflow-x-auto md:overflow-hidden ${
                move === 1
                  ? "translate-x-0"
                  : move === 2
                  ? "-translate-x-[200px]"
                  : move === 3
                  ? "-translate-x-[400px]"
                  : "-translate-x-[600px]"
              } transition-transform ease-linear duration-200`}
            >
              {cardsPrecargadas.map((element, index) => {
                const testRealizado = user?.test?.find(
                  (result) => result.id === element?.idTest
                );
                if (testRealizado) {
                  const findTest = user?.test.find(
                    (test) => test?.id === element?.idTest
                  );
                  const resultadoDominante =
                    findTest?.result && findTest?.result.length > 0
                      ? findTest.result[0]?.result_detail?.resultadoDominante
                      : null;
                  const resultadoGrafica =
                    findTest?.result && findTest?.result.length > 0
                      ? findTest.result[0]?.result_detail?.resultadoGrafica
                      : null;
                  const resultado =
                    findTest?.result && findTest?.result.length > 0
                      ? findTest.result[0]?.result_detail?.resultado
                      : null;

                  return (
                    <CardTest
                      key={index}
                      elementCard={{
                        id: element.id,
                        idTest: element.idTest,
                        title: element.title,
                        imagen: element.imagen,
                      }}
                      resultadoDominante={resultadoDominante}
                      resultadoGrafica={resultadoGrafica}
                      resultado={resultado}
                    />
                  );
                }
              })}
            </section>
          ) : (
            <h2>Aún no te han asignado tests</h2>
          )}
          <section className="pagination w-full flex flex-row justify-center items-center p-2 gap-3 md:hidden">
            <span
              className={`card1 h-3 aspect-square rounded-full ${
                move === 1 ? "w-6 bg-boldTextColor" : "w-3 bg-bgColor"
              } transition-all ease-linear duration-200`}
              onClick={() => setMove(1)}
            />
            <span
              className={`card2 h-3 aspect-square rounded-full ${
                move === 2 ? "w-6 bg-boldTextColor" : "w-3 bg-bgColor"
              } transition-all ease-linear duration-200`}
              onClick={() => setMove(2)}
            />
            <span
              className={`card1 h-3 aspect-square rounded-full ${
                move === 3 ? "w-6 bg-boldTextColor" : "w-3 bg-bgColor"
              } transition-all ease-linear duration-200`}
              onClick={() => setMove(3)}
            />
            <span
              className={`card1 h-3 aspect-square rounded-full ${
                move === 4 ? "w-6 bg-boldTextColor" : "w-3 bg-bgColor"
              } transition-all ease-linear duration-200`}
              onClick={() => setMove(4)}
            />
          </section>
        </>
      )}
    </section>
  );
};

export default Dashboard;
