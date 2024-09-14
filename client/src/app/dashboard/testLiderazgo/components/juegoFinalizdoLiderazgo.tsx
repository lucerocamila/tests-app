"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useLiderasgoStore } from "@/store/TestLiderazgoStore/TestLiderazgoStore";
import UseDbLidTransformacional from "@/app/components/DbLidTransformacional/DbLidTransformacional";
import { generaCalculoRenderLiderazgo } from "@/app/utils/hellpersLiderazgo";
import MyLoader from "./esqueleto1";
import { RenderPolar } from "@/app/components/PolarAreaChar/PolarAreaChar";
import YellowButton from "@/app/components/YellowButton/YellowButton";
import { DownloadPdfLider } from "../PdfRender/PdfRender";
import MoreInfoButton from "@/app/components/MoreInfoButton/MoreInfoButton";
import Link from "next/link";

interface Resultado {
  type: string;
  points: number;
}
interface ResultadoDominante {
  description: string;
  imagePath: string;
  name: string;
  type: string;
}
interface ResultadoGrafica {
  name: string;
  value: number;
}

export interface Resultado_detail {
  resultadoDominante: ResultadoDominante;
  resultado: Resultado[];
  resultadoGrafica: ResultadoGrafica[];
}

interface JuegoFinalizadoProps {
  resultadoGrafica: { name: string; value: number }[];
}

const JuegoFinalizadoTestLiderazgo: React.FC<JuegoFinalizadoProps> = ({
  resultadoGrafica,
}) => {
  const {
    resultPreguntas,
    setResultPreguntas,
    resultado,
    setResultRenderGrafica,
    idsTestsUsers,
    finalizo,
    resultEnviadoLiderazgo,
    setResultEnviadoLiderazgo,
  } = useLiderasgoStore();

  localStorage.removeItem(`startTime-${idsTestsUsers?.idTest}`);
  // console.log("res123",resultado)

  useEffect(() => {
    const { resultados } = UseDbLidTransformacional();
    setResultPreguntas(resultados);
  }, [setResultPreguntas]);

  useEffect(() => {
    if (resultado && resultado?.length > 0) {
      generaCalculoRenderLiderazgo(resultado, setResultRenderGrafica);
    }
  }, [resultado, setResultRenderGrafica]);

  const encontrarTipoDominante = (valores: any[]): string | null => {
    const tipoDominante = valores.reduce(
      (dominante, valor) =>
        valor.value > (dominante?.value || 0) ? valor : dominante,
      null as any
    );

    return tipoDominante?.name || null;
  };

  const tipoDominante = encontrarTipoDominante(resultadoGrafica);
  const resultadoDominante = tipoDominante
    ? resultPreguntas?.find(
        (resultado) =>
          resultado.type.toLowerCase() === tipoDominante.toLowerCase()
      )
    : null;

  const postResult = async (objeto: any) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idsTestsUsers?.idToken}`,
      },
      body: JSON.stringify(objeto),
    };

    const res = await fetch(
      "https://test-game-app.onrender.com/api/result",
      requestOptions
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    if (
      resultado &&
      resultadoDominante &&
      resultPreguntas &&
      resultadoGrafica &&
      idsTestsUsers
    ) {
      const result_detail: Resultado_detail = {
        resultadoDominante,
        resultado,
        resultadoGrafica,
      };

      const data = {
        description: resultadoDominante?.name,
        result_detail,
        userId: idsTestsUsers?.idUser,
        testId: idsTestsUsers?.idTest,
      };
      if (resultEnviadoLiderazgo === true) {
        console.log("Resultado ya enviado");
      } else {
        postResult(data)
          .then((data) => {
            console.log("Resultado enviado");
            setResultEnviadoLiderazgo(true);
          })
          .catch((error) => {
            console.error("Error al enviar los datos:", error);
          });
      }
    }
  }, []);

  return (
    <>
      {resultadoDominante ? (
        <main className="w-full h-full flex flex-col justify-center items-center gap-6 md:gap-4 px-3">
          <section className="subtitle flex flex-col items-center justify-center pt-3">
            <h3 className="font-robotoMono text-center text-lg">Tu perfil se inclina a:</h3> <br />
            <h2 className="font-robotoMono text-center text-lg">
              <strong className="capitalize text-2xl">
                {resultadoDominante?.name}
              </strong>
            </h2>
          </section>
          <section className="containMainDetail flex flex-col md:flex-row md:justify-around items-center space-y-6 h-full w-full min-h-[20rem]">
          <section className="imageJugador flex flex-col gap-5 items-center w-full max-w-[28rem]">
              <Image
                src={resultadoDominante?.imagePath || ""} // Asegurar que no sea undefined
                alt="Jugador"
                width={190}
                height={160}
              />
              <p className="descripcion font-robotoMono text-center break-words whitespace-normal text-sm px-3">
                {resultadoDominante?.description}
              </p>
            </section>
            <section className="containContenido w-full max-w-[250px] sm:max-w-[300px] h-auto md:w-1/2 md:h-auto flex flex-col justify-center items-center gap-5">
              <MoreInfoButton text="PDF">
                {resultPreguntas && resultadoDominante && (
                  <DownloadPdfLider
                    resultPreguntas={resultPreguntas}
                    resultadoDominante={resultadoDominante}
                    resultadoGrafica={resultadoGrafica}
                    resultado={resultado}
                  />
                )}
              </MoreInfoButton>
              <div className="border-2 w-full max-w-[250px] sm:max-w-none">
                <RenderPolar data={resultadoGrafica} name="titulo" />
              </div>
            </section>
          </section>
          <div className="w-full max-w-[10rem] mx-auto">
            <Link href="/dashboard">
              <YellowButton textSize={"w-[180px] h-[40px] text-xs"}>
                Ir a Dashboard
              </YellowButton>
            </Link>
          </div>
        </main>
      ) : (
        <>
          <MyLoader />
        </>
      )}
    </>
  );
};

export default JuegoFinalizadoTestLiderazgo;
