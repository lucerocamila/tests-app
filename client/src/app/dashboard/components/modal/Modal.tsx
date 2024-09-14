'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { User } from '../../admin/type';
import { useUserStore } from '@/store/fetchStore/fetchApi';
// import { useAuthStoreConsultant } from '@/store/AuthStoreConsultant/AuthStoreConsultan';
// import { UseAuthStoreAdmin } from '@/store/AuthStoreAdmin/AuthStoreAdmin';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  roleTitle?: string;
  companyId?: string;
  testId?: string;
  password?: string;
  token:string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user , token }) => {
  const { updateUser, isLoading, error, fetchData, fetchTests, tests, fetchCompany, company } = useUserStore();
  const [formData, setFormData] = useState<Partial<User>>({
    fullName: '',
    companyId: '',
    roleTitle: '',
    testId: '',
  });

  // const {userConsultant} = useAuthStoreConsultant()
  // const {userAdmin} = UseAuthStoreAdmin()
  // const newToken = userConsultant?.token || userAdmin?.token

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        roleTitle: user.roleTitle || '',
        companyId: user.companyId || '',
        testId: user.testId || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if(token && isOpen){
      if (isOpen) {
        fetchTests(token);
        fetchCompany(token);
      }
    }
  }, [isOpen, fetchTests, fetchCompany, token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Verifica si el campo es roleTitle y si la opción seleccionada es diferente al valor actual
    if (name === 'roleTitle' && value !== formData.roleTitle) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== 'roleTitle') { // Para otros campos que no sean roleTitle, actualiza siempre el estado
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (user?.id &&token) {
      // Eliminar campos vacíos del formData
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== '')
      );
      const success = await updateUser(user.id, filteredFormData, token);
      if (token){
        if (success) {
          fetchData(token);
          onClose(); // Cerrar el modal después de actualizar
        }
      }
    }
  };
  
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 text-colorText rounded-lg shadow-lg">
        <button onClick={handleClose} className="absolute top-0 right-0 m-3 bg-slate-100 text-slate-400 rounded-full w-10 h-10 hover:text-gray-800 focus:outline-none flex justify-center items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {user ? `Editar Usuario: ${user.fullName}` : 'Editar Usuario'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-2">
          <input type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Correo electrónico" className="hidden input-field text-zinc-500" />
          <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleChange} placeholder="Nombre completo" className="input-field text-zinc-500" />
          <select name="testId" value={formData.testId || ''} onChange={handleChange} className="input-field">
            <option value="">Seleccione un test...</option>
            {tests.map(test => (
              <option key={test.id} value={test.id}>{test.name}</option>
            ))}
          </select>
          <select name="companyId" value={formData.companyId || ''} onChange={handleChange} className="input-field">
            <option value="">Seleccione una empresa...</option>
            {company.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
          <select name="roleTitle" value={formData.roleTitle || ''} onChange={handleChange} className="input-field">
            <option value="">Seleccione un rol...</option>
            <option value="consultant">Consultor</option>
            <option value="user">Usuario</option>
          </select>
          <div className="flex justify-around">
            <button type="submit" className="bg-boldTextColor w-24 text-white py-2 rounded-md" disabled={isLoading}>Actualizar</button>
            <button type="button" onClick={handleClose} className="bg-colorButton ml-2 w-24 text-white py-2 rounded-md">Cancelar</button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      </div>
    </div>
  );
};

export default Modal;
