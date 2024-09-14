import React from 'react';
import './OptionButton.css';

interface OptionButtonProps {
  text: string;
  items: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ text, isSelected, items, onClick }) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        className={`flex checked_option font-robotoMono font-semibold w-full text-black rounded-lg text-md min-h-[3.5rem]  md:min-w-[19.25rem]  ${isSelected ? 'bg-checked_option border border-black py-0' : 'bg-unchecked_option py-[1px]'}`}
      >
        <div className={`flex items-center justify-center mr-auto h-full`}>
          <div className='mr-auto'>   
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={1} stroke="currentColor" className=" w-[2.5rem] h-[2.5rem] md:w-[3.8rem] md:h-[3.8rem]">
            <circle cx="12" cy="12" r="9" className="stroke-current" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12 11.25 15 15 9.75" className={`stroke-current ${isSelected ? '' : 'hidden'}`} />
          </svg>
          </div>
       
          <p className={`flex ${items} py-1 break-words whitespace-normal w-full h-full text-start text-xs md:text-sm`}>
            {text}
          </p>
        </div>
      </button>
    </div>
  );
};

export default OptionButton;
