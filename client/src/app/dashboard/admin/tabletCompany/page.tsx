'use client'
import { useEffect, useState } from 'react'
import { User , Company} from '../type';
import Image from 'next/image';
import SideBarButton from '@/app/components/SideBarButton/SideBarButton';
import RotatingQuadSpinner from '@/app/components/RotatingQuadSpinner';

export default function TableCompany() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const adminToken = localStorage.getItem('adminToken');
        console.log(adminToken)
        const response = await fetch(`https://test-game-app.onrender.com/api/company?offset=0&limit=10`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          const initialData: Company[] = await response.json();
          console.log(initialData);
          setData(initialData);
          setTotalPages(Math.ceil(initialData.length / ITEMS_PER_PAGE));
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error: any) {
        console.error('Error al obtener los datos:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const getVisibleConsultants = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data?.slice(startIndex, endIndex);
  };


  const toggleActive = async (id: string) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await fetch(`https://test-game-app.onrender.com/api/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          isActive: !data.find(person => person.id === id)?.isActive,
        }),
      });

      if (response.ok) {
        setData((prevData) =>
          prevData.map((person) =>
            person.id === id ? { ...person, isActive: !person.isActive } : person
          )
        );
        console.log('Estado actualizado correctamente');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Error al actualizar el estado:', error.message);
    }
  };

  return (
<section className='w-[90%] h-screen flex flex-col justify-center items-center absolute md:left-44'>




    <div className=' h-[40px] box-border m-2 flex justify-around relative w-full '>
    <div className='w-[50%]  absolute md:left-24'>
      <label htmlFor="inputSearch" className="sr-only">Search </label>
      <input id="inputSearch" type="text" placeholder="Search..." className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 " />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 text-neutral-500 dark:text-neutral-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </span>
    </div>
    <div className='w-[50%] absolute h-[39px] md:-right-24 '>
      <SideBarButton
        href="/dashboard/admin/createCompany"
        colorClass="bg-fuchsia_color mx-auto md:gap-2 text-white"
        text="Nueva empresa"
        isActive={true}
        svgPath="M10 0.25C4.61522 0.25 0.25 4.61522 0.25 10C0.25 15.3848 4.61522 19.75 10 19.75C15.3848 19.75 19.75 15.3848 19.75 10C19.75 4.61522 15.3848 0.25 10 0.25ZM10.75 7C10.75 6.58579 10.4142 6.25 10 6.25C9.58579 6.25 9.25 6.58579 9.25 7V9.25H7C6.58579 9.25 6.25 9.58579 6.25 10C6.25 10.4142 6.58579 10.75 7 10.75H9.25V13C9.25 13.4142 9.58579 13.75 10 13.75C10.4142 13.75 10.75 13.4142 10.75 13V10.75H13C13.4142 10.75 13.75 10.4142 13.75 10C13.75 9.58579 13.4142 9.25 13 9.25H10.75V7Z"
      />
    </div>

  </div>




    <div className="overflow-x-auto md:overflow-hidden w-[90%] md:w-[85%] mx-auto p-4 border rounded-md border-black bg-white text-slate-500 dark:bg-neutral-700">
         {isLoading && <RotatingQuadSpinner BG="none"/>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!isLoading && !error && (


          <table className="min-w-full text-left text-xs whitespace-nowrap min-h-96 p-2">
            <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 border-t w-full">
              <tr className='text-slate-500'>
                {/* <th scope="col" className="w-6 h-4 border-x dark:border-neutral-600 w-[20%]">
                  Usuario
                </th>
                 */}
                <th scope="col" className="w-6 h-4 border-x dark:border-neutral-600 w-[20%]">
                  Email
                </th>
                <th scope="col" className="w-6 h-4 border-x dark:border-neutral-600 hidden md:table-cell w-[20%]">
                  Empresa
                </th>

                <th scope="col" className="w-6 h-4 border-x dark:border-neutral-600 hidden md:table-cell w-[20%]">
                  empleados
                </th>
                <th scope="col" className="w-6 h-4 border-x dark:border-neutral-600 w-[20%]">
                  autorizado / no autorizado
                </th>
              </tr>
            </thead>
            <tbody className='min-w-full'>
              {getVisibleConsultants()?.map((consultor) => (
                <tr key={consultor.id} className="border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 w-full px-2">
                  {/* <td className="w-6 h-4 border-x dark:border-neutral-600 font-bold w-[22%]">
                    <div className="flex justify-start items-center w-full p-2 ">
                      {consultor.avatar ? (
                        <Image
                          src={consultor.avatar}
                          width={10}
                          height={10}
                          alt="Avatar"
                          className="rounded-full w-12 h-12 mr-2"
                        />
                      ) : (
                        <Image
                          src="/favicon.ico"
                          width={30}
                          height={30}
                          // Ruta de la imagen por defecto
                          alt="Default Avatar"
                          className="rounded-full mr-1"
                        />
                      )}
                      <p className='overflow-hidden text-ellipsis'>{consultor.fullName} </p>
                    </div>
                  </td> */}
                  {/* */}
                  <td className="w-6 h-4 border-x dark:border-neutral-600 w-[18%]">
                    <p className='overflow-hidden text-ellipsis'>{consultor.email} </p>
                  </td>
                  <td className="w-6 h-4 border-x dark:border-neutral-600 hidden md:table-cell w-[20%]">
                    <p className='overflow-hidden text-ellipsis'>
                      {consultor.name || 'Sin empresa asignada'}
                    </p>
                  </td>

                  <td className="w-6 h-4 border-x dark:border-neutral-600 hidden md:table-cell w-[20%]">
                    <p className=' overflow-hidden text-ellipsis'>
                      {consultor.employees?.length ? consultor.employees?.map((test) => (
                        <span key={test.id}>{test.fullName}, </span>
                      )) : <span>No tiene tests.</span>}
                    </p>
                  </td>

                  <td className="w-6 h-4 border-x dark:border-neutral-600 text-center w-[20%]">
                    <button
                      onClick={() => toggleActive(consultor.id)}
                      className={`${consultor.isActive ? 'bg-green-500' : 'bg-red-500'} w-20 text-white px-2 py-1 rounded`}
                    >
                      {consultor.isActive ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
    </div>

    </section>
  )
}
