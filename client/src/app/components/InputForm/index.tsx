import React, { ChangeEvent } from 'react';
import './InputForm.css'

interface InputFormProps {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputForm: React.FC<InputFormProps> = ({ placeholder, type, name, value, onChange, error }) => {
  return (
    <div className="containInput flex flex-col gap-2">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="inputForm w-full h-[3.6rem] sm:h-[4rem] md:h-[2.6rem] text-lg font-semibold md:font-normal md:text-xs text-black p-3 shadow-md shadow-[#000000] border-2 md:border-1 border-black focus:outline-none focus:border-guille_color4 placeholder-black font-kodeMono"
        autoComplete="off"
      />
      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
    </div>
  );
};

export default InputForm;
