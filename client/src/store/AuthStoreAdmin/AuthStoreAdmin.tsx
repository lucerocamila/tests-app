import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Role {
  id : string;
  isActive: boolean;
  title: string;
}

interface UserAdmin {
  id: string;
  email: string;
  role: Role;
  token: string;
}

interface AuthStoreAdmin {
  userAdmin: UserAdmin | null;
  setUserAdmin: (user: UserAdmin | null) => void;
  logoutAdmin: () => void;
  }

export const UseAuthStoreAdmin = create(
  persist<AuthStoreAdmin>(
  (set) => ({
  userAdmin: null,
  setUserAdmin: (user) => set({ userAdmin: user }),
  logoutAdmin: () => {
    set({ userAdmin: null });
    localStorage.removeItem('adminToken');
  },
}),{
    name: 'user-storage-admin',
})
);
