"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import personaje from "@/img/portada.png";
import { UseAuthStore } from "@/store/AuthStore/AuthStore";
import YellowButton from "../components/YellowButton/YellowButton";
import { UseAuthStoreAdmin } from "@/store/AuthStoreAdmin/AuthStoreAdmin";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();

  const { user, setUser } = UseAuthStore();
  const { userAdmin, setUserAdmin } = UseAuthStoreAdmin();

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

    return validateErrors;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    // const loginData = { email, password };

    getLogin({ email, password }).then((data) => {
      // setUser(data)
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        if (data.role?.id === 2) {
          setUser(data);
          router.push("/dashboard");
        } else if (data.role?.id === 1) {
          setUserAdmin(data);
          router.push("/dashboard/consultor");
        } else if (data.role?.id === 3) {
          // setUserAdmin(data)
          router.push("/dashboard/admin");
        }
      } else {
        setErrors({ email: "Credenciales inválidas" });
        setSuccessMessage("");
      }
    });
  };

  async function getLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
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

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  }

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="contentLogin flex w-full min-h-screen justify-center items-center">
      <section className="containmaximo w-full max-w-[1900px] h-screen mx-auto flex flex-col justify-center items-center sm:flex-row">
        {/* División  */}
        <section className="w-full h-screen md:h-screen md:w-1/2 flex flex-col justify-center items-center bg-cover sm:bg-none relative">
          {successMessage && (
            <p className="text-green-500 text-sm font-semibold capitalize font-titulo">
              {successMessage}
            </p>
          )}
          <form
            onSubmit={handleLogin}
            className="w-[90%] text-start max-w-lg p-8 md:w-[500px] h-[80%] md:h-full  md:max-h-[600px] bg-opacity-90 sm:bg-opacity-100 flex flex-col justify-center items-center gap-5 bg-bgColor opacity-90 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">
              Iniciar Sesión
            </h2>

            <div className="flex flex-col gap-5 w-full">
              <label
                htmlFor="email"
                className="text-base md:text-lg font-semibold flex flex-col gap-2 text-slate-800"
              >
                Correo Electrónico
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 p-3 text-colorText border rounded-md focus:outline-none focus:border-guille_color4"
                  autoComplete="current-password"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.email}
                  </p>
                )}
              </label>

              <label
                htmlFor="password"
                className="text-base md:text-lg font-semibold flex flex-col gap-2 text-slate-800"
              >
                Contraseña
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 p-3 text-colorText  border rounded-md focus:outline-none focus:border-guille_color4"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.password}
                  </p>
                )}
              </label>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="w-full">
                <YellowButton textSize="text-xs md:text-sm" type="submit">
                  Iniciar Sesion
                </YellowButton>
              </div>
            </div>
          </form>
        </section>
        <div className=" hidden md:w-1/2 md:h-screen relative md:flex justify-center items-center p-5">
          <figure className="w-full h-full object-contain rounded-xl overflow-hidden">
            <Image
              src={personaje}
              alt="Fondo"
              className="w-full h-full object-cover"
              priority={true}
              placeholder="blur"
            />
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Login;
