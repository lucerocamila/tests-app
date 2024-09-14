import { create } from 'zustand'

interface NavStore {
  activeNav: boolean ;
  setActiveNav: (activeNav: boolean) => void;
  
}

const useNavStore = create<NavStore>((set) => ({
  activeNav: false,
  setActiveNav: (activeNav) => set({ activeNav }),
}))

export default useNavStore