import React from 'react';

interface SidebarSectionProps {
    maxHeight?: string;
    children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ children }) => {
    return (
        <div className={`flex flex-col w-full space-x-2 mb-4`}>
            <div className='justify-self-end'>
                <h2 className="text-start text-black font-robotoMono text-md border-b border-black w-full">
                    {children}
                </h2>
            </div>
        </div>
    );
};
//hay que ponerle un maxHeight en donde se llame max-h-3 ej
export default SidebarSection;
