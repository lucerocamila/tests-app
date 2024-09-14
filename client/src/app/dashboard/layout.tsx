"use client";
import React, { useState, useEffect } from "react";
import YellowButton from "../components/YellowButton/YellowButton";
import CheckboxNav from "../components/CheckboxNav/CheckboxNav";
import GlobalSidebar from "../components/Esqueletos/EsqueletoSideBar";
import useNavStore from "@/store/NavStore/NavStore";
import SideBarButton from "../components/SideBarButton/SideBarButton";
import SidebarSection from "../components/SideBarSection/SideBarSection";
import { useRouter } from "next/navigation";
import { UseAuthStore } from "@/store/AuthStore/AuthStore";
import { UseAuthStoreAdmin } from "@/store/AuthStoreAdmin/AuthStoreAdmin";
import { useAuthStoreConsultant } from "@/store/AuthStoreConsultant/AuthStoreConsultan";
import { useClientStore } from "@/store/TestJugadorStore/TestJugadorSrore";
import { useLiderasgoStore } from "@/store/TestLiderazgoStore/TestLiderazgoStore";
import { ToastContainer } from "react-toastify";
import RotatingQuadSpinner from "../components/RotatingQuadSpinner";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logoutUser } = UseAuthStore();
  const { userAdmin, logoutAdmin } = UseAuthStoreAdmin();
  const { userConsultant, logoutConsultant } = useAuthStoreConsultant();
  const { activeNav } = useNavStore();
  const { resultEnviado } = useClientStore();
  const { resultEnviadoLiderazgo } = useLiderasgoStore();
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);

  const handleSignOutUser = async () => {
    localStorage.removeItem("ally-supports-cache");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("test-jugador-storage");
    localStorage.removeItem("liderazgo-storage");
    localStorage.removeItem("habilidades-blandas-storage");
    localStorage.removeItem("startTime");
    localStorage.removeItem("currentQuestionIndex");
    setIsLoadingSignOut(true);
    localStorage.clear();
    logoutAdmin();
    logoutConsultant();
    logoutUser();
    router.push("/");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  useEffect(() => {
    if (isLoadingSignOut) {
    }
  }, [isLoadingSignOut]);

  const calcNameTest = (val: string | undefined) => {
    let testName = "";
    let testRoute = "";

    switch (val) {
      case "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498":
        testName = "Test Jugador";
        testRoute = "/dashboard/testJugador";
        break;
      case "d2556cb9-3cb7-42f3-8b69-b4341154dc1d":
        testName = "Test Liderazgo";
        testRoute = "/dashboard/testLiderazgo";
        break;
      case "74eed584-ef28-434d-999f-f09636fc142c":
        testName = "Test Habilidades";
        testRoute = "/dashboard/testHabilidadesBlandas";
        break;
      default:
        testName = "";
        testRoute = "";
    }

    return { name: testName, ruta: testRoute };
  };
  if (user) {
    console.log("hay user");
  }
  if (userAdmin) {
    console.log("hay userAdmin");
  }
  if (userConsultant) {
    console.log("hay userConsultant");
  }
  const renderTestButton = (elementId: string, index: number) => {
    const resumen = calcNameTest(elementId);
    const isActive =
      (elementId === "449a92b2-fdfa-4ddf-ba4f-a5f8d39b2498" && resultEnviado) ||
      (elementId === "d2556cb9-3cb7-42f3-8b69-b4341154dc1d" &&
        resultEnviadoLiderazgo);
    const colorClass = isActive ? "bg-checked_option" : "bg-fuchsia_color";
    const svgPath = isActive
      ? "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      : "M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z";

    return (
      <li key={index} className="md:w-full md:h-[40px] box-border relative">
        <SideBarButton
          colorClass={colorClass}
          href={resumen.ruta}
          text={resumen.name}
          isActive={true}
          svgPath={svgPath}
        />
      </li>
    );
  };

  const renderSignOutButton = () => {
    return (
      <div className="mb-4 md:justify-self-end md:px-2 w-[11rem] h-[3rem] md:h-[3.3rem]">
        <YellowButton onClick={handleSignOutUser} SVG="SignOut">
          Salir
        </YellowButton>
      </div>
    );
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden justify-center md:justify-start relative">
      {/* Sidebar  */}
      <section className="toggle w-[100px] md:w-[200px] h-[5rem] top-2 left-1 rounded-md flex justify-center items-start overflow-hidden z-30 fixed">
        <CheckboxNav />
      </section>

      {(user || userAdmin || userConsultant) && (
        <section
          className={`bg-white absolute h-full md:max-h-[41rem] w-full md:h-full md:w-[200px] flex flex-col justify-start md:justify-center md:items-center pt-7 md:pt-0 px-2 md:pl-4 ${
            activeNav
              ? "translate-y-[0] md:translate-x-[0] md:w-[14rem]"
              : "-translate-y-full md:translate-y-0 md:-translate-x-[200px]"
          } transition-transform ease-linear duration-200 z-20 `}
          style={{ boxShadow: "2px 2px 0px #acacac" }}
        >
          {user && (
            <nav className="flex flex-col md:justify-center h-full min-h-[10rem] md:min-h-full md:max-h-[33rem] items-center md:m-0 w-full">
              <ul className="botonesBar md:px-[3] relative h-full space-y-6 md:space-y-0 max-w-[19rem] md:max-w-none md:max-h-full max-h-[33rem] w-[400px] flex flex-row flex-wrap justify-between md:justify-start md:items-center box-border md:gap-5 sm:w-full md:flex-col">
                <div className="flex justify-center items-end w-full h-full max-h-[8rem] px-2 md:px-0">
                  <SidebarSection>Tests</SidebarSection>
                </div>
                <li className="md:w-full md:h-[40px] box-border relative">
                  <SideBarButton
                    href="/dashboard"
                    colorClass="bg-violet_color"
                    text="Dashboard"
                    isActive={true}
                    svgPath="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </li>
                {user.test.map((element, index) =>
                  element.isActive ? renderTestButton(element.id, index) : null
                )}
              </ul>
              {renderSignOutButton()}
            </nav>
          )}

          {userAdmin && (
            <nav className="flex flex-col md:justify-center h-full max-h-[33rem] items-center md:m-0  w-full pt-[3rem] md:pt-0">
              <ul className="botonesBar relative px-[1rem] md:px-0 h-full w-full flex flex-row flex-wrap justify-around md:justify-start items-start md:items-center box-border gap-5 sm:w-full md:flex-col">
                <div className="flex justify-center items-end w-full h-full max-h-[8rem] px-2 md:px-0">
                  <SidebarSection>Admin Section</SidebarSection>
                </div>
                <li className="md:w-full md:h-[40px] box-border relative">
                  <SideBarButton
                    href="/dashboard/admin"
                    colorClass="bg-fuchsia_color"
                    text="Administrador"
                  />
                </li>
              </ul>
              {renderSignOutButton()}
            </nav>
          )}

          {userConsultant && (
            <nav className="flex flex-col md:justify-center h-full max-h-[33rem] items-center md:m-0  w-full pt-[3rem] md:pt-0">
              <ul className="botonesBar relative px-[1rem] md:px-0 h-full w-full flex flex-row flex-wrap justify-around md:justify-start items-start md:items-center box-border gap-5 sm:w-full md:flex-col">
                <div className="flex justify-center items-end w-full h-full max-h-[8rem] px-2 md:px-0">
                  <SidebarSection>Consultant Section</SidebarSection>
                </div>
                <li className="md:w-full md:h-[40px] box-border relative">
                  <SideBarButton
                    href="/dashboard/consultor"
                    colorClass="bg-fuchsia_color"
                    text="Consultor"
                  />
                </li>
              </ul>
              {renderSignOutButton()}
            </nav>
          )}
        </section>
      )}

      {!user && !userAdmin && !userConsultant && (
        <section className="global-spinner">
          <RotatingQuadSpinner />
        </section>
      )}

      <main className="flex-1 relative">{children}</main>

      <section className="flex justify-center items-center">
        <GlobalSidebar />
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}
