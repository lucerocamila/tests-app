
import { create } from 'zustand'
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

interface Test {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  question: Question[];
  result: any; // Esto puede ser del tipo adecuado para los resultados
}

interface Company {
  id: string;
  name: string;
  owner_first_name: string;
  owner_last_name: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdBy: string;
}

interface Role {
  id : string;
  isActive: boolean;
  title: string;
}

interface User {
  company: Company;
  createdBy: string;
  email: string;
  fullName: string;
  id: string;
  isActive: boolean;
  role: Role;
  test: Test[];
  token: string;
}
interface AuthStore {
  user: User | null;
  setUser: (data: User | null) => void;
  logoutUser: () => void;
  }

export const UseAuthStore = create(
  persist<AuthStore>((set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logoutUser: () =>{
        set({ user: null });
        localStorage.removeItem('user');
      }
        
    }),{ name: 'user-storage' })
);
