// components/SideBar.js

import React from 'react';
import CheckboxNav from '../CheckboxNav/CheckboxNav';
import './SideBar.css';

const SideBar = () => {
  return (
    <section className='toggle w-[50px] h-[50px] absolute top-1 left-1 rounded-md  flex justify-center items-center bg-orange-500 overflow-hidden z-30'>
      <CheckboxNav />
    </section>
  );
};

export default SideBar;
