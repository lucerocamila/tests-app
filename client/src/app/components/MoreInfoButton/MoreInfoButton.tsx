import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface MoreInfoButtonProps {
  href?: string;
  text?: string;
  children?: React.ReactNode;
}

const MoreInfoButton: React.FC<MoreInfoButtonProps> = ({
  href,
  text,
  children,
}) => {
  const isDownloadPDF = text === "PDF";
  // Renderiza solo el btn en lugar de un Link cuando el texto es "PDF"
  if (isDownloadPDF) {
    return (
      <Button
        className={`text-black font-kodeMono text-robotoMono text-sm font-semibold bg-unchecked_option flex min-h-[2.5rem] md:max-w-[16rem] rounded-[0.9rem] border-1 border-black w-full h-full`}
      >
        <p className="md:max-w-[10rem] break-words whitespace-normal mx-auto text-center hidden">
          {text}
        </p>
        {/* Renderiza el icono de descarga de PDF */}
        <section className="md:max-w-[10rem] break-words whitespace-normal mx-auto">
          {children}
        </section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 ml-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </Button>
    );
  }

  return (
    <Link href={href || ""}>
      <Button
        className={`text-black font-kodeMono text-robotoMono text-sm font-semibold bg-unchecked_option flex min-h-[2.5rem] md:w-[20rem] w-[90%] rounded-[0.9rem] border-1 border-black h-full mx-auto`}
      >
        <p className="md:max-w-[10rem] break-words whitespace-normal mx-auto text-center px.4">
          {text}
        </p>
        {/* Renderiza el icono por defecto si el texto no coincide con el texto esperado */}
        {!isDownloadPDF && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        )}
      </Button>
    </Link>
  );
};

export default MoreInfoButton;
