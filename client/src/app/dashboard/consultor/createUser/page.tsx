"use client";
import React, { useState, ChangeEvent } from "react";
import { useAuthStoreConsultant } from "@/store/AuthStoreConsultant/AuthStoreConsultan";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputForm from "@/app/components/InputForm";

const CreateUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [roleTitle, setRoleTitle] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registrationResponse, setRegistrationResponse] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const { userConsultant } = useAuthStoreConsultant();
  const newToken = userConsultant?.token;

  const router = useRouter();

  const validateForm = () => {
    const validateErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      validateErrors.email = "El email es obligatorio";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      validateErrors.email = "El email no es válido";
    }

    if (!password.trim()) {
      validateErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      validateErrors.password =
        "La contraseña debe tener al menos 8 caracteres";
    }

    if (!fullName.trim()) {
      validateErrors.fullName = "El nombre del consultor es obligatorio";
    }

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

    setErrors({});
    const registerData = { email, password, fullName, roleTitle };

    try {
      const response = await fetch(
        "https://test-game-app.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify(registerData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRegistrationResponse({ message: "Datos validos", success: true });

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

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full h-full p-4">
        <h2 className="font-robotoMono font-bold text-[1.5rem] md:text-[1.8rem] text-black text-center capitalize h-[3rem]">
          Nuevo Usuario
        </h2>
        {registrationResponse && (
          <p
            className={`text-white text-sm font-semibold capitalize font-titulo bg-${
              registrationResponse.success ? "lime" : "red"
            }-500 w-full text-center py-2`}
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

          <section className="space-y-[2rem] py-7 px-11">
            <InputForm
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFullName(e.target.value)
              }
              placeholder="Nombre y apellido"
              error={errors.fullName}
            />
            <InputForm
              type="email"
              name="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Correo"
              error={errors.email}
            />
            <div className="relative">
              <InputForm
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="Contraseña"
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1 bottom-0 px-4 md:px-3 flex justify-center items-center text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    className="h-8 w-8 md:h-4 md:w-4"
                  >
                    <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" />
                    <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    className="h-8 w-8 md:h-4 md:w-4"
                  >
                    <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                  </svg>
                )}
              </button>
            </div>
            {userConsultant && (
              <InputForm
                type="text"
                name="roleTitle"
                value={roleTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRoleTitle(e.target.value)
                }
                placeholder="Rol que desea crear (user)"
              />
            )}
          </section>
          <div className="p-7 px-11">
            <button
              type="submit"
              className="w-full bg-main_btn_2 text-text-black  p-4 mt-3 rounded-lg hover:bg-boldTextColor transition-colors ease-linear duration-250 focus:outline-none"
            >
              <b>Registrar Usuario</b>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateUser;
