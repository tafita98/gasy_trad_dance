import React, { useState, useEffect } from 'react'
import { Link ,useLocation} from 'react-router-dom';

import logo_instat from "../Saved Pictures/logo_nouveau_instat.png";
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { getUser } from '../function/Utilisateur';
import { useAuth } from '../context/AuthProvider';
function ModalContent({ onClose }) {
  const auth = useAuth();
  const [user, setUser] = useState([]);
  // appel fonction getUser
      const fetchUser = async ()=>{
       
          const data = await getUser(localStorage.getItem("auth_id"));
          setUser(data);
       
      }
      useEffect(()=>{
              fetchUser();
              // eslint-disable-next-line 
      },[])
  return (
    <div className="modal-content">
      <button onClick={onClose} className='x'>X</button>
      <div className='titre_profil'>
      <img   src={`http://localhost:8000/user/image/${user.profile}`}  alt="" className="profile" />
      </div>
      <ul className='menu_Modal'>
      <li>Bonjour {user.name}!</li>
        <li> <Link to={`/mainCustomer/voirProfile/${localStorage.getItem("auth_id")}`} className="nav_link"><FaUserCircle />Voir profil</Link></li>
        <li> <FaSignOutAlt /> <button onClick={() => auth.logOut()}> Log out</button></li>
      </ul>
    </div>
  );
}
function NavbarCustomer() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  // Fonction pour gérer le clic sur un lien
  const handleClick = (path) => {
      setActiveLink(path);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [user, setUser] = useState([]);
  // appel fonction getUser
      const fetchUser = async ()=>{
       
          const data = await getUser(localStorage.getItem("auth_id"));
          setUser(data);
       
      }
      useEffect(()=>{
              fetchUser();
              // eslint-disable-next-line 
      },[])
  return (
    <header className="header">
      <nav className="navbar">
        <div class="nav_logo">
          <Link to={"#"} >
            <img src={logo_instat} alt="instat Logo Logo" />
            <h4>Instat-microdonne</h4>
          </Link>
        </div>
        <input type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" id="hamburger-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </label>
        <ul className="links">
          <li>
            <Link to={"/mainCustomer/themeDetail"}   className={activeLink === "/mainCustomer/themeDetail" ? 'nav-active' : ''}
                onClick={() => handleClick("/mainCustomer/themeDetail")} >
              <i className="bx bxs-magic-wand"></i>
              Thème
            </Link>
          </li>
          <li><Link to={"/mainCustomer/theme"}   className={activeLink === "/mainCustomer/theme" ? 'nav-active' : ''}
                onClick={() => handleClick("/mainCustomer/theme")} >
            <i className="bx bx-loader-circle"></i>
            Donnée
          </Link>
          </li>
          <li>
            <Link to={"/mainCustomer/demande"}  
                className={activeLink === "/mainCustomer/demande" ? 'nav-active' : ''}
                onClick={() => handleClick("/mainCustomer/demande")} >
              <i className="bx bx-filter"></i>
              Demande
            </Link></li>
          <li>
            <Link to={"/mainCustomer/historique"} className={activeLink === "/mainCustomer/historique" ? 'nav-active' : ''}
                onClick={() => handleClick("/mainCustomer/historique")}>
              <i className="bx bx-layer"></i>
              Historique
            </Link>
          </li>
        </ul>
        <span onClick={openModal}>  <img   src={`http://localhost:8000/user/image/${user.profile}`}  alt="" className="profile" /></span>
        {isModalOpen && <ModalContent onClose={closeModal} />}
      </nav>
    </header>
  )
}

export default NavbarCustomer
