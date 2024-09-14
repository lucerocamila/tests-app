import React, { ReactNode } from 'react';
import YellowButton from '../YellowButton/YellowButton';
import { useClientStore } from '@/store/TestJugadorStore/TestJugadorSrore';
import { useLiderasgoStore } from '@/store/TestLiderazgoStore/TestLiderazgoStore';
import { useHabilidadesBlandasStore } from '@/store/TestHabilidadesStore/TestHabilidadesStore';

interface TestContainerProps {
  title: string;
  children: ReactNode;
  nextClick: (e?: any) => void;
}

const TestContainer: React.FC<TestContainerProps> = ({ title, children, nextClick }) => {

  const { finalizo: finalizoClient } = useClientStore();
  const { finalizo: finalizoLiderazgo } = useLiderasgoStore();
  const { finalizo: finalizoHabilidadesBlandas } = useHabilidadesBlandasStore();

  const finalizo =
    finalizoClient && title === "Estilos de jugador" ||
    finalizoLiderazgo && title === "Liderazgo Transformacional" ||
    finalizoHabilidadesBlandas && title === "Habilidades Blandas"
    


  return (
    <>
      <div className='flex justify-center items-center min-h-[11rem] lg:min-h-9'>
        <h1 className={`font-robotoMono font-bold text-[1.5rem] md:text-[1.8rem] text-black text-center capitalize`}>{finalizo ? "Tu resultado" : title}</h1>
      </div>
      <div className='flex justify-center items-center h-full w-full'>
        <section className="principalContain relative flex flex-col justify-center gap-4 w-[85%] md:max-w-[56rem] min-h-[35.5rem] py-2 bg-white rounded-3xl shadow-md border-3 border-black text-slate-800 ">
          <section className="containTest w-full h-full mb-2 flex flex-col justify-center items-center gap-5 md:gap-2 px-2 sm:px-4 min-h-[20rem]">
            {children}              
            {!finalizo && (
            <div className="md:justify-self-end px-7 md:px-2 w-full max-w-[10rem] h-[3rem] md:h-[3.3rem] mt-7">
                <YellowButton onClick={nextClick} SVG='Next'>
                  Siguiente
                </YellowButton>
            </div>              
            )}

          </section>
        </section>
      </div>
    </>
  );
}

export default TestContainer;