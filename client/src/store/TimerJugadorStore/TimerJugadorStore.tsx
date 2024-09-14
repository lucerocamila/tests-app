import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerJugador {
  value: number;
  setValue: (value: number) => void;
  remainingTimeString: number | null;
  setRemainingTimeString: (remainingTimeString: number | null) => void;
}

export const TimerJugadorStore = create(
  persist<TimerJugador>(
  (set) => ({
  value: 100,
  setValue: (value) => set({ value }),
  remainingTimeString: null,
  setRemainingTimeString: (remainingTimeString) => set({ remainingTimeString }),
  }), {
      name: 'timer-jugador-storage',
  })
);

