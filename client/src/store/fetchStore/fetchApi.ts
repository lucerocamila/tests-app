import {create} from 'zustand';
import {User , Test , Company} from '@/app/dashboard/admin/type'
// Definición de los tipos para el estado y las acciones
interface UserState {
  data: User[];
  tests: Test[];
  company: Company[]
  user: User[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchData: (adminToken:string) => Promise<void>;
  fetchTests: (adminToken:string) => Promise<void>;
  fetchCompany: (adminToken:string) => Promise<void>;
  updateUser: (userId: string, updatedData: Partial<User>, adminToken:string) => Promise<boolean>;
}

export const ITEMS_PER_PAGE = 100
// Creación de la tienda con Zustand
export const useUserStore = create<UserState>((set, get) => ({

  data: [],
  tests: [],
  company:[],
  user: [],
  isLoading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,


  fetchData: async (adminToken) => {
    set({ isLoading: true, error: null });
    try {
      // const adminToken = localStorage.getItem('adminToken');
      
      const response = await fetch('https://test-game-app.onrender.com/api/user?offset=0&limit=100', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });
      if (!adminToken) {
        throw new Error('Token de administrador no encontrado.');
      }
  
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }

      const currentPage = get().currentPage;
      const userData: User[] = await response.json();
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const usersForPage = userData.slice(startIndex, endIndex);
      const totalPages = Math.ceil(userData.length / ITEMS_PER_PAGE);
  
      set({
        totalPages: totalPages,
        data: usersForPage
      });
    } catch (error: any) {
      set({ error: error.message });
      console.error('Error al obtener los datos:', error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  
  updateUser: async (userId, updatedData, adminToken) => {
    set({ isLoading: true });
    try {
      // const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://test-game-app.onrender.com/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`, 
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        
        throw new Error(`Error al actualizar: ${response.status}`);
      }
  
      const data = await response.json();
      set(state => ({ data: state.data.map(user => user.id === userId ? data : user) })); // Actualiza el usuario en el estado
  
      return true; // Devuelve true si la actualización fue exitosa
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      return false; // Devuelve false si hubo un error
    } finally {
      set({ isLoading: false });
    }
  },

  
  

  fetchTests: async (adminToken) => {
    try {
      // const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        throw new Error('Token de administrador no encontrado.');
      }

      const response = await fetch('https://test-game-app.onrender.com/api/tests', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }

      const testsData: Test[] = await response.json();
      set({ tests: testsData });
    } catch (error: any) {
      console.error('Error al obtener tests:', error.message);
    }
  },



  fetchCompany: async (adminToken) => {
    try {
      // const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        throw new Error('Token de administrador no encontrado.');
      }

      const response = await fetch('https://test-game-app.onrender.com/api/company', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }

      const companyData: Company[] = await response.json();
      set({ company: companyData });
    } catch (error: any) {
      console.error('Error al obtener empresas:', error.message);
    }
  },
}));

// Ahora puedes usar `useUserStore` en tus componentes para acceder y modificar el estado global
