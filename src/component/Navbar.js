import React , { useState,useEffect } from 'react'

import logo_instat from "../Saved Pictures/logo_nouveau_instat.png";
import { FaSignOutAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { getUser } from '../function/Utilisateur';
import { getNotificationNumber } from '../function/Notification';

import { FaCalendarAlt } from 'react-icons/fa'; 
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
    <>
    <div class="modal-overlay"></div>
    <div className="modal-content">
      <button onClick={onClose} className='x'>X</button>
            <div className='titre_profil'>
            <img   src={`http://localhost:8000/user/image/${user.profile}`}  alt="" className="profile" />
             </div>
      <ul className='menu_Modal'>
        <li>Bonjour {user.name}!</li>
        <li><Link to={`/main/voirProfil/${localStorage.getItem("auth_id")}`} className="nav_link">Voir profil</Link></li>
        <li> <FaSignOutAlt /> <button  onClick={() => auth.logOut()}> Log out</button></li>
      </ul>
    </div>
    </>
  );
}
function Navbar() {
  const [notif, setNotif] = useState([]);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // appel fonction de notification
const fetchNotif = async()=>{
  const notif_data = await getNotificationNumber();
  setNotif(notif_data);
}
useEffect(()=>{
  fetchNotif();
  // eslint-disable-next-line
},[])
 // calendrier
 const [showCalendar, setShowCalendar] = useState(false);

 const toggleCalendar = () => {
   setShowCalendar(!showCalendar);
 };

  return (
    <nav className="navbar">
      <div className="logo_item">
      <img src={logo_instat} alt="instat Logo Logo" />
      <h3>Instat-Microdonne</h3>
      </div>
      <div className="navbar_content">
    
      <FaCalendarAlt
            onClick={toggleCalendar}
            style={{ cursor: 'pointer', fontSize: '24px' }}
          />
          {/* Affichage du calendrier si showCalendar est true */}
          {showCalendar && (
            <div className="calendar-popup">
              <input type="date" className="calendar-input" />
            </div>
          )}
        <Link to={`/main/notification`} className="nav_link">
        <div  style={{fontWeight:"600"}}>
        <i className='bx bx-bell' >
        {(notif.length  >= 1) && (<span >{notif.length}</span>)}
       
        </i>
        </div>
        </Link>
        <span onClick={openModal}><img   src={`http://localhost:8000/user/image/${user.profile}`}  alt="" className="profile" /></span>
        {isModalOpen && <ModalContent onClose={closeModal} />}
      </div>
    </nav>
  )
}

export default Navbar
