"use client";

import React, { useState, useEffect } from "react";
import { User } from "./type";
import Image from "next/image";
import SideBarButton from "@/app/components/SideBarButton/SideBarButton";
import Modal from "../components/modal/Modal";
import { useUserStore } from "@/store/fetchStore/fetchApi";
import { UseAuthStoreAdmin } from "@/store/AuthStoreAdmin/AuthStoreAdmin";
import RotatingQuadSpinner from "@/app/components/RotatingQuadSpinner";

const Page: React.FC = () => {
  const { data, fetchData, fetchCompany, fetchTests } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userAdmin } = UseAuthStoreAdmin();
  const ITEMS_PER_PAGE = 5;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalWithUser = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const newToken = userAdmin?.token;

  useEffect(() => {
    if (newToken) {
      const initFetch = async () => {
        setIsLoading(true);
        try {
          await fetchData(newToken);
          await fetchCompany(newToken);
          await fetchTests(newToken);
        } catch (error) {
          setError("Hubo un error al cargar los datos.");
        } finally {
          setIsLoading(false);
        }
      };
      initFetch();
    }
  }, [fetchData, fetchCompany, fetchTests, newToken]);

  useEffect(() => {
    const totalPagesCount = Math.ceil(data.length / ITEMS_PER_PAGE);
    setTotalPages(totalPagesCount);
  }, [data]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${
            currentPage === i
              ? "bg-slate-900 text-white"
              : "bg-gray-300 text-black"
          } w-[3rem] h-[3rem] md:w-[2rem] md:h-[2rem] rounded-full mr-2`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const getVisibleConsultants = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data?.slice(startIndex, endIndex);
  };

  return (
    <section className="w-full md:w-[90%] h-screen flex flex-col justify-center items-center absolute md:relative left-3 md:left-0 ml-auto">
      <div className="md:min-h-[4rem] m-4 box-border mt-8 flex gap-4 justify-center items-center md:justify-end md:w-[90%] h-[40%] md:h-full mx-auto">
        {/* DEJEN ESTO CON HIDDEN CON LOS ESTILOS QUE TIENE */}
        <div className="hidden">
          <section className="flex flex-col justify-center items-center md:flex-row gap-4 h-full">
            <div className="relative ">
              <label htmlFor="inputSearch" className="sr-only">
                Search{" "}
              </label>
              <input
                id="inputSearch"
                type="text"
                placeholder="Search..."
                className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 "
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4 text-neutral-500 dark:text-neutral-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
            </div>
            <select
              id="inputFilter"
              aria-label="Filtrar por"
              className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </section>
        </div>

        <div className="h-full max-h-[4rem] md:h-[3rem] flex flex-col justify-center items-center md:flex-row">
          <SideBarButton
            href="/dashboard/admin/createUser"
            colorClass="bg-fuchsia_color mx-auto md:gap-2 text-white"
            text="Añadir Usuario o Consultor"
            isActive={true}
            svgPath="M10 0.25C4.61522 0.25 0.25 4.61522 0.25 10C0.25 15.3848 4.61522 19.75 10 19.75C15.3848 19.75 19.75 15.3848 19.75 10C19.75 4.61522 15.3848 0.25 10 0.25ZM10.75 7C10.75 6.58579 10.4142 6.25 10 6.25C9.58579 6.25 9.25 6.58579 9.25 7V9.25H7C6.58579 9.25 6.25 9.58579 6.25 10C6.25 10.4142 6.58579 10.75 7 10.75H9.25V13C9.25 13.4142 9.58579 13.75 10 13.75C10.4142 13.75 10.75 13.4142 10.75 13V10.75H13C13.4142 10.75 13.75 10.4142 13.75 10C13.75 9.58579 13.4142 9.25 13 9.25H10.75V7Z"
          />
        </div>
      </div>

      <div className="flex justify-center md:flex-none overflow-x-auto md:overflow-hidden w-full max-w-[70rem] h-full max-h-[35rem] md:max-h-[27rem] mx-auto p-4 border rounded-md border-black bg-white text-slate-500 dark:bg-neutral-700">
        {isLoading && <RotatingQuadSpinner BG="none" />}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!isLoading && !error && (
          <section className="md:max-h-[35rem] h-full overflow-y-auto">
            <table className="w-full text-left text-sm whitespace-nowrap h-full p-2 mx-auto">
              <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 border-t w-full max-w-[2rem]">
                <tr className="text-slate-500 w-full">
                  <th
                    scope="col"
                    className="max-w-[200px] min-w-[200px] border-x dark:border-neutral-600 break-words whitespace-normal font-bold"
                  >
                    Usuario
                  </th>
                  <th
                    scope="col"
                    className="max-w-[15rem] min-w-[15rem] h-[70px] border-x dark:border-neutral-600 md:table-cell"
                  >
                    Tests asignados
                  </th>
                  <th
                    scope="col"
                    className="max-w-[15rem] min-w-[15rem] md:max-w-[17rem] md:min-w-[17rem] h-[70px] border-x dark:border-neutral-600"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="max-w-[120px] min-w-[120px] h-[50px] border-x dark:border-neutral-600 md:table-cell"
                  >
                    Empresa
                  </th>
                  <th
                    scope="col"
                    className="min-w-[100px] max-w-[100px] h-[50px] break-words whitespace-normal border-x dark:border-neutral-600"
                  >
                    autorizado / no autorizado
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {getVisibleConsultants()?.map((consultor) => (
                  <tr
                    key={consultor.id}
                    className="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 px-2"
                  >
                    <td className="w-[200px] h-[50px] border-x dark:border-neutral-600 break-words whitespace-normal font-bold">
                      <div className="flex justify-start items-center w-full p-2 min-w-[5rem] break-words whitespace-normal ">
                        {consultor.avatar ? (
                          <Image
                            src={consultor.avatar}
                            width={30}
                            height={30}
                            alt="Avatar"
                            className="rounded-full mr-2"
                          />
                        ) : (
                          <Image
                            src="/favicon.ico"
                            width={30}
                            height={30}
                            alt="Default Avatar"
                            className="rounded-full mr-1"
                          />
                        )}
                      <p className="break-words whitespace-normal w-[11rem] ml-3">
                          {consultor.fullName}
                        </p>
                      </div>
                    </td>
                    <td className="w-[200px] h-[50px] border-x dark:border-neutral-600 break-words whitespace-normal md:table-cell">
                      <div className="flex p-1 w-full justify-between">
                        {consultor.test && consultor.test.length > 0 ? (
                          <div className="w-[100] flex flex-col pb-1">
                            {consultor.test.map((test, index) => (
                              <div
                                key={index}
                                className="flex flex-col text-ellipsis"
                              >
                                <span className="flex justify-start items-center gap-1">
                                  <span className="w-2 h-2 bg-emerald-600 rounded-md"></span>
                                  <p className="break-words whitespace-normal w-[11rem] ml-3">
                                    {test.name}
                                  </p>
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span>No tiene tests.</span>
                        )}
                      </div>
                    </td>

                    <td className="w-[200px] h-[50px] border-x dark:border-neutral-600 break-words whitespace-normal">
                      <div className="flex w-full">
                      <p className="break-words whitespace-normal w-[15rem] ml-3">
                          {consultor.email}
                        </p>
                      </div>
                    </td>
                    <td className="w-[200px] h-[50px] border-x dark:border-neutral-600 break-words whitespace-normal md:table-cell">
                      <div className="flex justify-between items-center">
                      <p className="break-words whitespace-normal w-[11rem] ml-3">
                          {consultor.company ? consultor.company.name : "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="w-[200px] h-[50px] border-x dark:border-neutral-600 break-words whitespace-normal text-center">
                      <button
                        type="button"
                        onClick={() => openModalWithUser(consultor)}
                        aria-label="Abrir modal con consultor"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.7312 2.26884C20.706 1.24372 19.044 1.24372 18.0188 2.26884L16.8617 3.42599L20.574 7.1383L21.7312 5.98116C22.7563 4.95603 22.7563 3.29397 21.7312 2.26884Z"
                            fill="#0F172A"
                          />
                          <path
                            d="M19.5133 8.19896L15.801 4.48665L7.40019 12.8875C6.78341 13.5043 6.33002 14.265 6.081 15.101L5.28122 17.7859C5.2026 18.0498 5.27494 18.3356 5.46967 18.5303C5.6644 18.725 5.95019 18.7974 6.21412 18.7188L8.89901 17.919C9.73498 17.67 10.4957 17.2166 11.1125 16.5998L19.5133 8.19896Z"
                            fill="#0F172A"
                          />
                          <path
                            d="M5.25 5.24999C3.59315 5.24999 2.25 6.59314 2.25 8.24999V18.75C2.25 20.4068 3.59315 21.75 5.25 21.75H15.75C17.4069 21.75 18.75 20.4068 18.75 18.75V13.5C18.75 13.0858 18.4142 12.75 18 12.75C17.5858 12.75 17.25 13.0858 17.25 13.5V18.75C17.25 19.5784 16.5784 20.25 15.75 20.25H5.25C4.42157 20.25 3.75 19.5784 3.75 18.75V8.24999C3.75 7.42156 4.42157 6.74999 5.25 6.74999H10.5C10.9142 6.74999 11.25 6.41421 11.25 5.99999C11.25 5.58578 10.9142 5.24999 10.5 5.24999H5.25Z"
                            fill="#0F172A"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
      <nav className="mt-5 flex items-center justify-center text-sm">
        <ul className="list-style-none flex justify-center flex-wrap gap-3 md:gap-1">
          {renderPaginationButtons()}
        </ul>
      </nav>

      {isModalOpen && (
        <>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            user={currentUser}
            token={newToken || ""}
          >
            <p>Contenido del modal</p>
          </Modal>
        </>
      )}
    </section>
  );
};

export default Page;
