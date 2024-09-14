import React from 'react';
import Image from 'next/image';
import liderazgo from '../../../../../img/habilidadliderazgo.png';
import personal from '../../../../../img/habilidadpersonal.png';
import profesional from '../../../../../img/habilidadprofesional.png';
import './SkillsTable.css';

const SkillsTable: React.FC = () => {
  return (
    <div className="flex justify-center container">

      <div className="panel-bg flex flex-col max-w-[56rem]">

        <header className='flex items-center'>
          <div className="relative w-16 h-16 mb-2">
            <div className="absolute inset-0 flex items-center justify-center border-2 border-orange-200 rounded-full">
              <Image
                alt="cup"
                className="rounded-full mr-1 mb-1 filter saturate-150"
                width={70}
                height={70}
                src="https://d125fmws0bore1.cloudfront.net/assets/svgs/icon_trophy_leaderboard-3442a4b2312e6cdd02aa9870e636dc082890277a6267c4ed986a750fef7cbb35.svg"
              />
            </div>
          </div>
          <h2 className='font-kodeMono font-bold text-[1.5rem] md:text-[1.8rem] text-black md:text-white text-center ml-6'>
            Tu ranking de habilidades</h2>
          <div className='hidden md:block ml-auto'>
            <button
              className="cursor-pointer text-xs flex justify-between text-white font-bold shadow-purple-400 rounded-full px-5 py-2 bg-gradient-to-bl from-purple-500 to-purple-800 tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-200 hover:ring-1 font-kodeMono w-[150px]"
            >
              Descarga tu info completa
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[6rem] h-[3rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </button>
          </div>


        </header>
        <section className='panel white-table mx-auto max-w-[55rem]'>
          <div className="ranking-skill">
            <section className="ranking-img-container">
              <Image src={liderazgo} alt="Liderazgo" className="ranking-img" width={100} height={100} />
            </section>
            <h2 className="text-gray-600 text-lg font-semibold tracking-wide font-kodeMono">
              Habilidades de liderazgo</h2>
            <ul className="py-10 space-y-7">
              <li className='h-8 border-1 relative'>
                <div className="leader-1-img absolute top-[-5px]"></div>
              </li>
              <li className='h-8 border-1 relative'>
                <div className="leader-2-img absolute top-[-5px]"></div>
              </li>
              <li className='h-8 border-1 relative text-center'>
                <div className="w-full leader-3-img absolute font-bold text-2xl top-[-5px] text-black text-opacity-25">
                  <p className='text-center mx-'>........</p>
                </div>
              </li>
            </ul>
            <a href="#/" className="ranking-button">Ver más</a>
          </div>

          <div className="ranking-skill">
            <section className="ranking-img-container">
              <Image src={profesional} alt="Profesional" className="ranking-img" width={100} height={100} />
            </section>
            <h2 className="text-gray-600 text-lg font-semibold tracking-wide font-kodeMono">
              Habilidades profesionales</h2>
            <ul className="py-10 space-y-7">
              <li className='h-8 border-1 relative'>
                <div className="leader-1-img absolute top-[-5px]"></div>
              </li>
              <li className='h-8 border-1 relative'>
                <div className="leader-2-img absolute top-[-5px]"></div>
              </li>
              <li className='h-8 border-1 relative'>
                <div className="leader-3-img absolute font-bold text-2xl top-[-5px] text-black text-opacity-25 text-center">
                  ........
                </div>
              </li>
            </ul>
            <a href="#/" className="ranking-button">Ver más</a>
          </div>

          <div className="ranking-skill">
            <section className="ranking-img-container">
              <Image src={personal} alt="Personal" className="ranking-img" width={100} height={100} />
            </section>
            <h2 className="text-gray-600 text-lg font-semibold tracking-wide font-kodeMono">
              Habilidades personales</h2>
            <ul className="py-10 space-y-7">
              <li className='h-8 border-1 relative'>
                <div className="leader-1-img absolute top-[-5px] w-full"></div>
              </li>
              <li className='h-8 border-1 relative'>
                <div className="leader-2-img absolute top-[-5px] w-full"></div>
              </li>
              <li className='h-8 border-1 relative'>
                <div className="leader-3-img absolute font-bold text-2xl top-[-5px] text-black text-opacity-25 text-center">
                  ........
                </div>
              </li>
            </ul>
            <a href="#/" className="ranking-button">Ver más</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkillsTable;
