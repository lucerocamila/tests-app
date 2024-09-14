"use client";
import React, { useEffect, useState } from "react";
import UseDbTipoJugador from "@/app/components/DbTipoJugador/DbTipoJugador";
import RenderRadarChars from "@/app/components/RadarChars/RenderRadarChars";
import { useClientStore } from "@/store/TestJugadorStore/TestJugadorSrore";
import Image from "next/image";
import { generaCalculoRender } from "@/app/utils/helpers";
import YellowButton from "@/app/components/YellowButton/YellowButton";
import { DownloadPdf } from "../PdfRender/PdfRender";
import MoreInfoButton from "@/app/components/MoreInfoButton/MoreInfoButton";
import Link from "next/link";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

interface Resultado {
  val: string;
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

type Props = {
  description: string;
  result_detail: Resultado_detail[];
  userId: string;
  testId: string;
  token: string;
};

interface JuegoFinalizadoProps {
  resultadoGrafica: { name: string; value: number }[];
}

const JuegoFinalizado: React.FC<JuegoFinalizadoProps> = ({
  resultadoGrafica,
}) => {
  const {
    resultPreguntas,
    resultado,
    setResultPreguntas,
    setResultRenderGrafica,
    idsTestsUsers,
    finalizo,
    resultEnviado,
    setResultEnviado,
  } = useClientStore();

  localStorage.removeItem(`startTime-${idsTestsUsers?.idTest}`);

  useEffect(() => {
    const { resultados } = UseDbTipoJugador();
    setResultPreguntas(resultados);
  }, []);

  useEffect(() => {
    if (resultado) {
      generaCalculoRender(resultado, setResultRenderGrafica);
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
    ? resultPreguntas?.find((resultado) => resultado.type === tipoDominante)
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
    if (res.status === 401) {
      throw new Error("No tiene autorizacion");
    } else if (res.status === 403) {
      throw new Error("Prohibido, Token error");
    } else if (res.status === 500) {
      throw new Error("Error de Servidor");
    } else if (res.status === 400) {
      throw new Error("Solicitud Incorrecta");
    } else if (res.status === 404) {
      throw new Error("No se encontro el usuario");
    } else if (res.status === 201) {
      console.log("Resultado enviado");
      setResultEnviado(true);
      return res;
    } else {
      console.log("Resultado enviado");
      setResultEnviado(true);
      return res;
    }
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

      if (resultEnviado === true) {
        // setMensaje({ valor: 1, mensaje: "ya se envio su resultado anteriormente!!!"})
        console.log("ya se envio su resultado anteriormente!!!");
      } else {
        postResult(data);
      }
    }
  }, [
    resultado,
    resultadoDominante,
    resultPreguntas,
    idsTestsUsers,
    resultadoGrafica,
    resultEnviado,
    setResultEnviado,
    postResult,
  ]);

  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center gap-6 md:gap-0 px-3">
        <section className="subtitle flex flex-col items-center justify-center pt-3">
          <h3 className="font-robotoMono text-center text-lg">Tu tipo de jugador es:</h3> <br />
          <h2 className="font-robotoMono text-center text-lg ">
            <strong className="text-2xl">{resultadoDominante?.name}</strong>
          </h2>
        </section>
        <section className="containMainDetail flex flex-col md:flex-row md:justify-around items-center space-y-6 h-full w-full min-h-[20rem] md:pb-4">
          <section className="imageJugador flex flex-col gap-5 md:gap-11 h-full items-center w-full max-w-[22rem]">
            <Image
              src={resultadoDominante?.imagePath || ""} // Asegurar que no sea undefined
              alt="Jugador"
              width={200}
              height={150}
              className=""
            />
            <p className="descripcion font-robotoMono text-center break-words whitespace-normal text-sm px-3 ">
              {resultadoDominante?.description}
            </p>
          </section>
          
          <section className="containContenido w-full max-w-[250px] sm:max-w-[300px] h-auto md:w-1/2 md:h-auto flex flex-col justify-center items-center gap-5">
            <MoreInfoButton text="PDF">
              {resultPreguntas && resultadoDominante && (
                <DownloadPdf
                  resultadoDominante={resultadoDominante}
                  resultadoGrafica={resultadoGrafica}
                  resultado={resultado}
                />
              )}
            </MoreInfoButton>
            <div className="border-2 w-full max-w-[250px] sm:max-w-none">
              <RenderRadarChars chartData={resultadoGrafica} />
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
    </>
  );
};

export default JuegoFinalizado;
