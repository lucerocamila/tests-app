import React from 'react';
import Link from 'next/link';
import './SideBarButton.css';

export interface SideBarButtonProps {
  href: string;
  colorClass: string;
  ruta?: string;
  name?: string; 
  text: string;
  isActive?: boolean;
  svgPath?: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ href, colorClass, text, isActive, svgPath }) => {
  return (
    <Link href={href} passHref className={`side-bar-button font-kodeMono text-xs text-white flex flex-col justify-around items-start h-[7rem] w-[7.6rem] md::max-h-[11rem] md:max-w-[11rem] md:items-center rounded-lg md:flex-row md:justify-between md:h-full md:w-full md:rounded-full px-2 ${colorClass}`}>
        <p className='mx-2 md:mx-auto'>
        {text}
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={isActive ? "currentColor" : "black"} className="w-6 h-6 md:ml-auto md:w-5 md:h-5 justify-self-end self-end md:justify-self-center md:self-center text-black ">
          <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
        </svg>
    </Link>
  );
};

export default SideBarButton;
