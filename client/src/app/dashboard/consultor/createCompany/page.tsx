"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Company } from "../../consultor/type";
import Link from "next/link";
import { useAuthStoreConsultant } from "@/store/AuthStoreConsultant/AuthStoreConsultan";
import InputForm from "@/app/components/InputForm";

interface Employee {
  id: string;
  name: string;
  company?: string;
}

const CreateCompany: React.FC = () => {
  const { userConsultant } = useAuthStoreConsultant();
  const consultantToken = userConsultant?.token;
  const [formData, setFormData] = useState<Company>({
    name: "",
    owner_first_name: "",
    owner_last_name: "",
    phone: "",
    email: "",
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registrationResponse, setRegistrationResponse] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const router = useRouter();

  const validateForm = () => {
    const validateErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      validateErrors.email = "El email es obligatorio";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
      validateErrors.email = "El email no es válido";
    }

    if (!formData.owner_first_name.trim()) {
      validateErrors.owner_first_name =
        "El nombre del propietario es obligatorio";
    }

    if (!formData.owner_last_name.trim()) {
      validateErrors.owner_last_name =
        "El apellido del propietario es obligatorio";
    }

    if (!formData.phone.trim()) {
      validateErrors.phone = "El teléfono es obligatorio";
    }

    // Validar otros campos del formulario según sea necesario

    return validateErrors;
  };

  const handleRegisterConsultor = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setRegistrationResponse(null);
      return;
    }

    try {
      const response = await fetch(
        "https://test-game-app.onrender.com/api/company",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${consultantToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRegistrationResponse({ message: "Datos válidos", success: true });
        router.push("/dashboard/consultor");
      } else {
        const errorData = await response.json();
        setRegistrationResponse({
          message: `Error: ${errorData.message}`,
          success: false,
        });
      }
    } catch (error: any) {
      console.error("Error en la solicitud:", error.message);
      setRegistrationResponse({
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full h-full p-4">
        <h2 className="font-robotoMono font-bold text-[1.5rem] md:text-[1.8rem] text-black text-center capitalize h-[3rem]">
          Nueva Empresa
        </h2>
        {registrationResponse && (
          <p
            className={`text-white text-sm font-semibold capitalize font-titulo bg-${
              registrationResponse.success ? "lime" : "red"
            }-500 w-[80%] mx-auto text-center py-2`}
          >
            {registrationResponse.message}
          </p>
        )}
        <form
          onSubmit={handleRegisterConsultor}
          className="w-full max-h-[60rem] md:w-[40rem] text-start bg-opacity-90 sm:bg-opacity-100 flex flex-col gap-2 border-2 border-black bg-white opacity-90 rounded-3xl"
        >
          <Link
            href="/dashboard/consultor"
            className="text-main_btn_2 hover:text-main_btn p-4 flex justify-start items-center gap-2 text-xl font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </Link>
          <section className="space-y-[2rem] py-5 px-11">
            <InputForm
              placeholder="Nombre de la empresa"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputForm
              placeholder="Nombre del propietario"
              type="text"
              name="owner_first_name"
              value={formData.owner_first_name}
              onChange={handleChange}
              error={errors.owner_first_name}
            />
            <InputForm
              placeholder="Apellido del propietario"
              type="text"
              name="owner_last_name"
              value={formData.owner_last_name}
              onChange={handleChange}
              error={errors.owner_last_name}
            />
            <InputForm
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputForm
              placeholder="Teléfono"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </section>
          <div className="p-5 px-11">
            <button
              type="submit"
              className="w-full bg-main_btn_2 text-text-black  p-4 mt-3 rounded-lg hover:bg-boldTextColor transition-colors ease-linear duration-250 focus:outline-none"
            >
              <b>Añadir</b>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateCompany;
