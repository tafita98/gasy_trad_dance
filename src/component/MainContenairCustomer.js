import {  Outlet } from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';
import Footer from './Footer';

function MainContenairCustomer() {
  return (
    <body>
    {/* <!-- navbar --> */}
    <NavbarCustomer/>

    {/* <!-- sidebar --> */}
  
    <div className=' mainCustomer ' >
        <Outlet/>
    </div>
    {/* <!-- footer --> */}
    <Footer/>
  </body>
  )
}

export default MainContenairCustomer
