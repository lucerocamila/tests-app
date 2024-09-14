import Image from 'next/image';
import React from 'react';
import perfilIMafe from '@/img/estimulacionIntelectual3.jpg'
import ModalDataUser from '../ModalData/ModalDataUser';
import ModalGrafica from '../ModalGrafica/ModalGrafica';

interface UserCardProps {
  usuario: {
    id: string;
    email: string;
    fullName: string;
    testHabilitado: any;
    renderGrafica?: {
        name: string;
        value: number;
      }[];
  };
  onProfileClick: () => void;
  onChartClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ usuario, onProfileClick, onChartClick }) => {
  if (!usuario) return null; 
  return (
    <section className="border-1 border-black bg-white p-2 pb-4 flex flex-col justify-around items-center gap-1 h-full w-full max-h-[19rem] max-w-[27rem] md:max-h-[14rem] md:max-w-[37rem] md:justify-center md:items-center md:gap-2 rounded-xl ">
      <div className='w-full md:max-w-[35rem] flex flex-col gap-4'>
      <section className="dataUserBanner w-full md:h-full flex text-slate-900 justify-between md:justify-around items-center">
        <div className='flex flex-col gap-3 text-center md:text-left'>
          <h1 className="text-start text-lg md:text-3xl font-robotoMono font-bold text-black">{usuario?.fullName}</h1>
          <div className='max-w-7rem] break-words whitespace-normal gap-1'>
          <p className="text-start text-base font-robotoMono">{usuario?.email}</p>        
          <p className="text-start text-base font-robotoMono">Test habilitados: {
            usuario?.testHabilitado?.length > 0 ? usuario?.testHabilitado?.map((test: any) => test.name).join(', ') : 'No hay test habilitados'
          }</p>
          </div>
        </div>
        <div className='md:pr-[2rem]'>
        <figure className='containImage w-[120px] md:w-160px aspect-square  border-4 border-colorButton rounded-full overflow-hidden' >
          <Image
          src={perfilIMafe} 
          width={400}
          height={400} 
          alt={'perfil img'} 
          className="w-full h-full aspect-square object-cover"/>
        </figure> </div> 
      </section>
      <section className="imagePerfilUser w-full md:h-full flex justify-between rounded-md text-slate-900 md:pl-[2rem]">
            
        <ModalGrafica />
        <ModalDataUser />
      </section>
      </div>
    </section>
  );
};

export default UserCard;
