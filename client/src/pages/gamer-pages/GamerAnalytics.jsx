import React, { useEffect, useState } from 'react'

import Navbar from "../../components/gamer-components/Navbar";
import Footer from '../../components/general-components/Footer'
import Analytics from '../../components/gamer-components/Analytics'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { gamerProfile } from '../../redux/actions/gamerAction'

const GamerAnalytics = () => {
    const location = useLocation();
    const {id} = location.state;

  const [darkMode, setDarkMode] = useState(false);
    
  return (
    <div>
      <Navbar />
      <div className={`container ${darkMode ? "dark-mode" : ""}`}>
        <div className="card-body">
          <div className="row">
            <Analytics id={id}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default GamerAnalytics
