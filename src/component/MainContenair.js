import React from 'react'
// import proj1 from "../Saved Pictures/simon.jpg"
import {  Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
function MainContenair() {
    return (
        <body>
        {/* <!-- navbar --> */}
        <Navbar/>
    
        {/* <!-- sidebar --> */}
        <Sidebar/>
        <div className='main' >
            <Outlet/>
        </div>
        
      </body>

    
    
    )
}

export default MainContenair
