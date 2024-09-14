
import { create } from 'zustand'
import  { Resultado } from "@/app/components/DbLidTransformacional/DbLidTransformacional"
import { persist } from 'zustand/middleware';

interface Answer {
  id: string;
  description: string;
  points: number;
  type: string | null;
  isEmpty: boolean;
  isActive: boolean;
}

interface Question {
  id: string;
  description: string;
  typeQuestion: string;
  isActive: boolean;
  answer: Answer[];
}

interface LiderasgoStore {
  data: Question[] | null;
  setData: (data: Question[] | null) => void;
  selectedOptions: { type: string; points: number }[] | null;
  setSelectedOptions: (options: { type: string; points: number }[]) => void;

  resultPreguntas: Resultado[] | null;
  setResultPreguntas: (result: Resultado[]) => void;
  finalizo: boolean;
  setFinalizo: (value: boolean) => void;
  preguntaActual: number;
  setPreguntaActual: (value: number) => void;
  resultado: { type: string; points: number }[] | null;
  setResultado: (result: { type: string; points: number }[]) => void;
  resultRenderGrafica: { name: string; value: number }[];
  setResultRenderGrafica: (data: { name: string; value: number }[]) => void;
  idsTestsUsers: {idUser:string, idToken:string, idTest:string} | null;
  setIdsTestsUsers: (data: {idUser:string, idToken:string, idTest:string}) => void;
  resultEnviadoLiderazgo: boolean;
  setResultEnviadoLiderazgo: (value: boolean) => void;
}

export const useLiderasgoStore = create(
  persist<LiderasgoStore>(  
    (set) => ({
    data: [],
    setData: (data) => set({ data }),
    selectedOptions: [],
    setSelectedOptions: (options) => set({ selectedOptions: options }), 
    resultPreguntas: [],
    setResultPreguntas: (result) => set({ resultPreguntas: result }),
    finalizo: false,
    setFinalizo: (value) => set({ finalizo: value }),
    preguntaActual: 0,
    setPreguntaActual: (value) => set({ preguntaActual: value }),
    resultado: [],
    setResultado: (result) => set({ resultado: result }),
    resultRenderGrafica: [],
    setResultRenderGrafica: (data) => set({ resultRenderGrafica: data }),
    idsTestsUsers: null,
    setIdsTestsUsers: (data) => set({ idsTestsUsers: data }),
    resultEnviadoLiderazgo: false,
    setResultEnviadoLiderazgo: (value) => set({ resultEnviadoLiderazgo: value }),
  }), {
    name: 'liderazgo-storage',
  })
);
