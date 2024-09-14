
import React from 'react'
import './buttonGoGamme.css'
import { FontTitle } from "../../ui/fonts";

const ButonGoGame = () => {
  
  return (
    <button className={`text-slate-700 ${FontTitle.className} antialiased`}>
      I N G R E S A R
      <div id="clip">
          <div id="leftTop" className="corner"></div>
          <div id="rightBottom" className="corner"></div>
          <div id="rightTop" className="corner"></div>
          <div id="leftBottom" className="corner"></div>
      </div>
      <span id="rightArrow" className="arrow"></span>
      <span id="leftArrow" className="arrow"></span>
    </button>
  )
}

export default ButonGoGame