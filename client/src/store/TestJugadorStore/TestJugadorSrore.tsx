
import { create } from 'zustand'
import { Resultado } from "@/app/components/DbTipoJugador/DbTipoJugador"
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

interface ClientStore {
  data: Question[] | null;
  setData: (data: Question[] | null) => void;
  selectedOptions: string[] | null;
  setSelectedOptions: (options: string[]) => void;
  resultPreguntas: Resultado[] | null;
  setResultPreguntas: (result: Resultado[]) => void;
  finalizo: boolean;
  setFinalizo: (value: boolean) => void;
  preguntaActual: number;
  setPreguntaActual: (value: number) => void;
  resultado: { val: string }[] | null;
  setResultado: (result: { val: string }[]) => void;
  resultRenderGrafica: { name: string; value: number }[];
  setResultRenderGrafica: (data: { name: string; value: number }[]) => void;
  idsTestsUsers: {idUser:string, idToken:string, idTest:string} | null;
  setIdsTestsUsers: (data: {idUser:string, idToken:string, idTest:string}) => void;
  resultEnviado: boolean;
  setResultEnviado: (value: boolean) => void;
}

export const useClientStore = create(
  persist<ClientStore>((set) => ({
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
    resultEnviado: false,
    setResultEnviado: (value) => set({ resultEnviado: value }), 
    }), {
      name: 'test-jugador-storage',
    })
);
