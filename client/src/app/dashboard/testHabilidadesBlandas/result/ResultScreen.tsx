import React from "react";
import BarChart3D from "@/app/components/3dBarChart/BarChart3D";
import questionsData from "../test3.json";
import Image from "next/image";
import YellowButton from "@/app/components/YellowButton/YellowButton";
import Link from "next/link";
import MoreInfoButton from "@/app/components/MoreInfoButton/MoreInfoButton";
import { useHabilidadesBlandasStore } from "@/store/TestHabilidadesStore/TestHabilidadesStore";
import PDFBehavioralTest from "./PDF/PDFBehavioralTest";

interface PercentageData {
  name: string;
  value: number;
}

interface ResultProps {
  pillarScores: {
    leadership: number;
    personalSkills: number;
    professionalSkills: number;
  };
  resultRenderGrafica: { name: string; value: number }[];
  restartQuiz: () => void;
  data: {
    mostProminentSkill: string;
    percentages: PercentageData[]; // Cambiado a PercentageData[]
  };
}

const ResultScreen: React.FC<ResultProps> = ({
  pillarScores,
  resultRenderGrafica,
  restartQuiz,
}) => {
  const numberOfQuestions: number = questionsData.questions.length;

  /// Calcula el número total de preguntas por tipo de habilidad
  const totalLeadershipQuestions: number = questionsData.questions.filter(
    (question) => question.typeQuestion === "Habilidades de liderazgo"
  ).length;
  const totalPersonalSkillsQuestions: number = questionsData.questions.filter(
    (question) => question.typeQuestion === "Habilidades personales"
  ).length;
  const totalProfessionalSkillsQuestions: number =
    questionsData.questions.filter(
      (question) => question.typeQuestion === "Habilidades profesionales"
    ).length;

  // Calcula el puntaje total de cada pilar
  const totalLeadershipScore: number = pillarScores.leadership
    ? pillarScores.leadership
    : 0;
  const totalPersonalSkillsScore: number = pillarScores.personalSkills
    ? pillarScores.personalSkills
    : 0;
  const totalProfessionalSkillsScore: number = pillarScores.professionalSkills
    ? pillarScores.professionalSkills
    : 0;

  // Calcula el porcentaje final de cada habilidad
  const percentageLeadership: number =
    (totalLeadershipScore / (totalLeadershipQuestions * numberOfQuestions)) *
    100;
  const percentagePersonalSkills: number =
    (totalPersonalSkillsScore /
      (totalPersonalSkillsQuestions * numberOfQuestions)) *
    100;
  const percentageProfessionalSkills: number =
    (totalProfessionalSkillsScore /
      (totalProfessionalSkillsQuestions * numberOfQuestions)) *
    100;

  // Ajusta los porcentajes para que sumen 100%
  const totalPercentage =
    percentageLeadership +
    percentagePersonalSkills +
    percentageProfessionalSkills;
  const adjustmentFactor = 100 / totalPercentage;
  const adjustedPercentageLeadership = percentageLeadership * adjustmentFactor;
  const adjustedPercentagePersonalSkills =
    percentagePersonalSkills * adjustmentFactor;
  const adjustedPercentageProfessionalSkills =
    percentageProfessionalSkills * adjustmentFactor;

  // Determina en qué pilar está la persona según el mayor o menor valor
  let mostProminentSkill: string = "";

  if (
    percentageLeadership > percentagePersonalSkills &&
    percentageLeadership > percentageProfessionalSkills
  ) {
    mostProminentSkill = "Habilidades de liderazgo";
  } else if (
    percentagePersonalSkills > percentageLeadership &&
    percentagePersonalSkills > percentageProfessionalSkills
  ) {
    mostProminentSkill = "Habilidades personales";
  } else {
    mostProminentSkill = "Habilidades profesionales";
  }

  // Valores gráfico de barras
  const labels = ["Liderazgo", "Profesionales", "Personales"];

  const values = [
    adjustedPercentageLeadership,
    adjustedPercentageProfessionalSkills,
    adjustedPercentagePersonalSkills,
  ];
  const percentages = [
    adjustedPercentageLeadership,
    adjustedPercentageProfessionalSkills,
    adjustedPercentagePersonalSkills,
  ];

  let description: string = "";
  switch (mostProminentSkill) {
    case "Habilidades de liderazgo":
      description = `Las Habilidades de liderazgo son aquellas que te permiten motivar e inspirar a otras personas para que den lo mejor de sí mismas y logren los objetivos comunes, usando tu visión, tu influencia y tu ejemplo. ¡Estas habilidades son imprescindibles para tu desarrollo y tu éxito profesional, y también para tu contribución y tu impacto social.!`;
      break;
    case "Habilidades personales":
      description = `Las Habilidades personales son aquellas que te permiten conocerte y valorarte a ti mismo, manejar tus emociones y tu estrés, y adaptarte a los cambios y a las situaciones nuevas. ¡Estas habilidades son fundamentales para tu bienestar y tu felicidad, y también para tu desarrollo personal y profesional.!`;
      break;
    case "Habilidades profesionales":
      description = `Las Habilidades profesionales son aquellas que te permiten desempeñar tu trabajo o tu estudio de forma eficaz y eficiente, usando tus conocimientos, tus recursos y tus herramientas. ¡Estas habilidades son esenciales para tu desarrollo y tu competitividad profesional, y también para tu satisfacción y tu realización personal.!`;
      break;
    default:
      description = "";
  }

  const getImageSrc = (mostProminentSkill: string): string => {
    switch (mostProminentSkill) {
      case "Habilidades de liderazgo":
        return "https://i.postimg.cc/pX0xCQvS/habilidadliderazgo.png";
      case "Habilidades personales":
        return "https://i.postimg.cc/8PkNLK2W/habilidadpersonal.png";
      case "Habilidades profesionales":
        return "https://i.postimg.cc/7Zf4WCYZ/habilidadprofesional.png";
      default:
        return "";
    }
  };

  return (
    <main className="w-full">
      <section className="subtitle justify-self-start flex flex-col items-center justify-center">
        <h3 className="font-robotoMono">Tus fortalezas se inclinan a:</h3>
        <br />
        <h2 className="font-robotoMono text-center">
          <strong className="text-2xl">{mostProminentSkill}</strong>
        </h2>
      </section>
      <section className="flex flex-col md:flex-row items-center md:justify-around h-full w-full min-h-[20rem]">
        <div className="flex flex-col items-center sm:w-[40%]">
          <Image
            src={getImageSrc(mostProminentSkill)}
            alt={mostProminentSkill}
            width={200}
            height={150}
          />

          <p className="font-robotoMono text-center break-words whitespace-normal text-sm px-3">
            {description}
          </p>
          <br />
        </div>
        <section className="containContenido flex flex-col items-center justify-center md:w-full md:h-full space-y-[2rem] md:space-y-[6rem] max-w-[250px] sm:max-w-[300px] h-auto gap-5">
          <MoreInfoButton text="PDF">
            <PDFBehavioralTest
              data={{ mostProminentSkill, percentages: values }}
            />
          </MoreInfoButton>
          <BarChart3D data={values} labels={labels} percentages={percentages} />
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
  );
};

export default ResultScreen;
