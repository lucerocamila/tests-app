import React from 'react'
import "./CheckboxNav.css"
import useNavStore from '@/store/NavStore/NavStore'

const CheckboxNav = () => {
  const { activeNav, setActiveNav } = useNavStore()

  const handelActiveNav = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setActiveNav(!activeNav)
  }

  // console.log(activeNav)
  return (

    <label className="hamburger" htmlFor="navToggle">
      <input type="checkbox" id="navToggle" checked={activeNav} onChange={handelActiveNav} title="Toggle Navigation" />
      <svg viewBox="0 0 32 32" className='bg-white border-black border-2 rounded-md' >
        <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
        <path className="line" d="M7 16 27 16"></path>
      </svg>
    </label>
// bg clicked bg-[#D9D9D9]

  )
}

export default CheckboxNav