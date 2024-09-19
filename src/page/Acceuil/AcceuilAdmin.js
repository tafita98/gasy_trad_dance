import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DowloadGraph from './DowloadGraph';
import { getAllMicrodata } from '../../function/Microdata';
import { getAlltheme } from '../../function/Theme';
import { getAllUser } from '../../function/Utilisateur';
import { getAllEnquete } from '../../function/Enquete';


function AcceuilAdmin() {
  const [loading, setLoading] = useState([]);
  const [microdata,setMicrodata] = useState([]);
  const [enquetes, setEnquetes] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const[themes, setThemes] = useState([]);

  // Appel fonction 
  const fetchMicrodatas = async () => {
    setLoading(true);
    const Micro = await getAllMicrodata();
    setMicrodata(Micro);
    setLoading(false);
};

const fetchTheme = async () => {
  setLoading(true);
  const Them = await getAlltheme();
  setThemes(Them);
  setLoading(false);
};

const fetchEnquetes = async () => {
  setLoading(true);
  const Enq= await getAllEnquete();
  setEnquetes(Enq);
  setLoading(false);
};
const fetchutilisateur = async () => {
  setLoading(true);
  const Use= await getAllUser();
  setUtilisateurs(Use);
  setLoading(false);
};


useEffect(()=>{
fetchMicrodatas();
fetchEnquetes();
fetchTheme();
fetchutilisateur();
},[])
if(loading){
  return   <h3>chargement...</h3>
}
  return (
    <div class="mainContenair">
       <h3>Dashboard</h3>
       <div className="boxes">
                <div className="box box1 box-active"><Link to={"/main/microdata"} >
                    <i className="uil uil-thumbs-up"></i>
                    <span className="text">Microdonnes</span>
                    <span className="number">{microdata.length}</span>
                </Link>
                </div>
                <div className="box box2">
                    <Link className='link' to={"/main/users"} >
                        <i className="uil uil-comments"></i>
                        <span className="text">Utilisateurs</span>
                        <span className="number">{utilisateurs.length}</span>
                    </Link>
                </div>
                <div className="box box3">
                    <Link className='link' to={"/main/enquete"} >
                        <i className="uil uil-comments"></i>
                        <span className="text">Enquetes</span>
                        <span className="number">{enquetes.length}</span>
                    </Link>
                </div>
                <div className="box box4">
                    <Link className='link' to={"/main/themeListe"} >
                        <i className="uil uil-comments"></i>
                        <span className="text">Themes</span>
                        <span className="number">{themes.length}</span>
                    </Link>
                </div>
            </div>
      <DowloadGraph/>
    </div>
  )
}

export default AcceuilAdmin
