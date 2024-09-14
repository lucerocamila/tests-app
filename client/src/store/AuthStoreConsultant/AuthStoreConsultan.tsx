import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Role {
  id : string;
  isActive: boolean;
  title: string;
}

interface Consultant {
  id: string;
  email: string;
  role: Role;
  token: string;
}

interface AuthStoreConsultant {
  userConsultant: Consultant | null;
  setUserConsultant: (user: Consultant | null) => void;
  logoutConsultant: () => void;
  }

export const useAuthStoreConsultant = create(
  persist<AuthStoreConsultant>((set) => ({
  userConsultant: null,
  setUserConsultant: (user) => set({ userConsultant: user }),
  logoutConsultant: () => {
    set({ userConsultant: null });
    localStorage.removeItem('consultantToken');
  },
  }),{
      name: 'user-storage-consultant',
  })
);
