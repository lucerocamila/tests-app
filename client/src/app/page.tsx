"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import portada from "@/img/portada.png";
import YellowButton from "./components/YellowButton/YellowButton";
import InputForm from "./components/InputForm";
import { UseAuthStore } from "@/store/AuthStore/AuthStore";
import { UseAuthStoreAdmin } from "@/store/AuthStoreAdmin/AuthStoreAdmin";
import { useAuthStoreConsultant } from "@/store/AuthStoreConsultant/AuthStoreConsultan";
import { FontTitle } from "@/app/ui/fonts";
import RotatingQuadSpinner from "./components/RotatingQuadSpinner";

type SuccessMessageErrorLoginState = {
  type: string;
  msj: string;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessageErrorLogin, setSuccessMessageErrorLogin] =
  useState<SuccessMessageErrorLoginState>({ type: "", msj: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { user, setUser } = UseAuthStore();
  const { userAdmin, setUserAdmin } = UseAuthStoreAdmin();
  const { userConsultant, setUserConsultant } = useAuthStoreConsultant();

  useEffect(() => {
    if (user || userAdmin || userConsultant) {
      router.push("/dashboard");
    }
  }, [user, userAdmin, userConsultant, router]);

  const validateForm = (): { [key: string]: string } => {
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

    return validateErrors;
  };

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    getLogin({ email, password }).then((data) => {
      setIsLoading(false);
      if (data.token) {
        if (data.role?.id === 2) {
          setUser(data);
          router.push("/dashboard");
        } else if (data.role?.id === 3) {
          setUserConsultant(data);
          router.push("/dashboard/consultor");
        } else {
          setUserAdmin(data);
          router.push("/dashboard/admin");
        }
      }
    });
  };

  async function getLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    const res = await fetch(
      "https://test-game-app.onrender.com/api/auth/login",
      requestOptions
    );

    if (res.status === 401) {
      setSuccessMessageErrorLogin({
        type: "error",
        msj: "No tiene Autorizacion, Verifica Credenciales",
      });
    } else if (res.status === 500) {
      setSuccessMessageErrorLogin({
        type: "error",
        msj: "Error interno del servidor",
      });
    } else if (res.status === 400) {
      setSuccessMessageErrorLogin({
        type: "error",
        msj: "Solicitud Incorrecta",
      });
    } else if (res.status === 200) {
      setSuccessMessageErrorLogin({ type: "success", msj: "Conectado..." });
    }
    setTimeout(() => {
      setSuccessMessageErrorLogin({ type: "", msj: "" });
    }, 3000);
    const data = await res.json();
    return data;
  }

  return (
    <main className="contentLogin flex w-full min-h-screen justify-center items-center">
      {isLoading && <RotatingQuadSpinner />}

      {successMessageErrorLogin?.type === "error" && (
        <p className="absolute z-30 top-1 right-2 bg-red-400 px-2 rounded-md font-normal text-lg">
          {successMessageErrorLogin?.msj || "error"}
        </p>
      )}
      {successMessageErrorLogin?.type === "success" && (
        <p className="absolute z-30 top-1 right-2 bg-green-400 px-2 rounded-md font-normal text-lg">
          {successMessageErrorLogin?.msj || "success"}
        </p>
      )}
      <section className="containmaximo w-full max-w-[1900px] h-full mx-auto flex justify-center items-center">
        <section className="flex md:justify-around w-full h-screen md:h-screen md:w-1/2 bg-cover sm:bg-none relative">
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-around md:justify-center h-[75%] m-auto max-h-[45rem] md:max-h-[30rem] md:gap-10 w-full max-w-[23rem]"
          >
            <h2
              className={`${FontTitle.className} md:mb-auto font-semibold text-[1.8rem] md:text-[2.6rem] text-center text-slate-900`}
            >
              ¡Bienvenid@!
            </h2>
            <section className="inputSection space-y-[3rem] w-[90%] mx-auto">
              <InputForm
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <div className="relative">
                <InputForm
                  placeholder="Contraseña"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </section>
            <div className="h-full max-h-[4rem] md:mt-auto w-[90%] mx-auto">
              <YellowButton textSize="text-xs md:text-sm" type="submit">
                {isLoading ? "Iniciando sesión..." : "Comenzar"}
              </YellowButton>
            </div>
          </form>
        </section>
        <div className="hidden md:w-1/2 md:h-screen relative md:flex justify-start items-center p-3">
          <figure className="flex justify-center items-center bg-white rounded-xl h-full max-h-[40rem] w-full max-w-[33rem] ">
            <Image
              src={portada}
              alt="Fondo"
              className="w-full max-w-[25rem] h-full max-h-[33rem] object-cover  "
              priority={true}
              placeholder="blur"
            />
          </figure>
        </div>
      </section>
    </main>
  );
};

export default Login;
