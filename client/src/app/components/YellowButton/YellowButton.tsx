import React from 'react';
import './YellowButton.css'

interface YellowButtonProps {
  onClick?: (e?: any) => void; 
  children?: React.ReactNode;
  textSize?: string; 
  type?: "button" | "submit";
  SVG?: string; // Cambia el nombre de prop a mayúsculas para que coincida con la interfaz
}

const YellowButton: React.FC<YellowButtonProps> = ({ onClick, children, textSize = "text-xs", type = "button", SVG }) => {
  const hasSignOut = SVG === "SignOut";
  const isNext = SVG === "Next";

  return (
    <button
      type={type} 
      className={`yellow-button-css font-kodeMono h-full flex justify-center items-center ${textSize} text-black py-2 w-full bg-main_btn rounded-full mx-auto`}
      onClick={onClick}
    >
      {hasSignOut && ( 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mr-2 w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
      )}
      {children}
      {isNext && ( 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
};

export default YellowButton;
