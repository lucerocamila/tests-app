import { create } from 'zustand';
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
  questions: string;
  description: string;
  typeQuestion: string;
  isActive: boolean;
  answer: Answer[];
}

interface PillarScores {
  leadership: number;
  personalSkills: number;
  professionalSkills: number;
}

interface AnswerScoresState {
  answerScores: { [key: string]: number };
  updateAnswerScores: (type: string, points: number) => void;
}

const answerScoresMiddleware = persist<AnswerScoresState>((set, get) => ({
  answerScores: {},
  updateAnswerScores: (type: string, points: number) => {
    set((state: AnswerScoresState) => ({
      answerScores: {
        ...state.answerScores,
        [type]: (state.answerScores[type] || 0) + points,
      },
    }));
  },
}), { name: 'answer-scores-storage' });

export const useAnswerScoresStore = create(answerScoresMiddleware);

type ScoresStateUpdater = (pillarScores: PillarScores) => void;
type ResultRenderGraficaStateUpdater = (resultRenderGrafica: { name: string; value: number }[]) => void;

interface HabilidadesBlandasStore {
  data: Question[] | null;
  setData: (data: Question[] | null) => void;
  finalizo: boolean;
  setFinalizo: (value: boolean) => void;
  preguntaActual: number;
  setPreguntaActual: (value: number) => void;
  resultado: { type: string; points: number }[] | null;
  setResultado: (result: { type: string; points: number }[]) => void;
  resultRenderGrafica: { name: string; value: number }[];
  setResultRenderGrafica: ResultRenderGraficaStateUpdater;
  selectedOptions: { type: string; points: number }[];
  setSelectedOptions: (options: { type: string; points: number }[]) => void;
  pillarScores: PillarScores;
  setPillarScores: ScoresStateUpdater;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  idsTestsUsers: { idUser: string; idToken: string; idTest: string } | null; 
  setIdsTestsUsers: (data: { idUser: string; idToken: string; idTest: string }) => void; 
}


export const useDetailedResultsStore = create<{ detailedResultsData: { [category: string]: { [skill: string]: number } }, setDetailedResultsData: (data: { [category: string]: { [skill: string]: number } }) => void }>((set) => ({
  detailedResultsData: {} as { [category: string]: { [skill: string]: number } },
  setDetailedResultsData: (data) => set({ detailedResultsData: data }),
}));


export const useHabilidadesBlandasStore = create(
  persist<HabilidadesBlandasStore>(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
      finalizo: false,
      setFinalizo: (value) => set({ finalizo: value }),
      preguntaActual: 0,
      setPreguntaActual: (value) => set({ preguntaActual: value }),
      resultado: null,
      setResultado: (result) => set({ resultado: result }),
      resultRenderGrafica: [],
      setResultRenderGrafica: (data) => set({ resultRenderGrafica: data }),
      idsTestsUsers: null,
      setIdsTestsUsers: (data) => set({ idsTestsUsers: data }), 
      selectedOptions: [],
      setSelectedOptions: (options) => set({ selectedOptions: options }),
      pillarScores: {
        leadership: 0,
        personalSkills: 0,
        professionalSkills: 0,
      },
      setPillarScores: (newScores) => set({ pillarScores: newScores }),
      currentQuestionIndex: 0,
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
    }),
    { name: 'habilidades-blandas-storage' }
  )
);
