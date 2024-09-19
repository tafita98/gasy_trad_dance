import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit} from 'react-icons/fa';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import {useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../component/Loading';
import { FaArrowLeft } from 'react-icons/fa';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
function ClientProfile() {
    const { id } = useParams()
    const user = useAuth();
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [prenom, setprenom] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [job, setJob] = useState('');
    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState();

    useEffect(()=>{
        fetchmicrodat()
        // eslint-disable-next-line
      },[])// eslint-disable-next-line
      const fetchmicrodat = async () => {
        setLoading(true);
          try {
            const response = await axios.get(`/api/users/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setLoading(false);
          const { name,email, prenom,age,job,city,profile} = response.data.user
          setName(name);
          setemail(email);
       setProfile(profile)
       console.log(profile);
          setAge(age);
          setJob(job);
          setCity(city);
          setprenom(prenom);
  
        } catch (error) {
            setLoading(false);
            const { response } = error;
            console.log(response);
            if (response && response.status === 422) {
                Swal.fire({
                    text: response.data.errors,
                    icon: "error"
                  });
                setLoading(false);
            } 
            else if (response && response.status === 401) {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                  });
                setLoading(false);
            }
             else if (response) {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                  });
                setLoading(false);
            } else {
                setLoading(false);
                Swal.fire({
                    text: "Une erreur s'est produite sur la récuperation .",
                    icon: "error"
                  });
                toast.error();
            }
        }
      }
  
      if (loading) {
        return <Loading/>
    }
  return (
    <div class="mainContenair">
         <ToastContainer />
         <div className="mainCo">
        <h3>Profil utilisateur</h3>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:'5px',  backgroud:'#fff', padding:'10px 15px' }}>

            <div class="cote_gauche" >
            <img   src={`http://localhost:8000/user/image/${profile}`}  alt="" className="profile" />
            </div>
            <div class="cote_droit" style={{display:'flex',flexDirection:'column',flexWrap:'wrap',gap:'5px', border:'1px solid #ccc',height:'100%',width:'600px',background:'#ffff', boxShadow: '0 0 8px rgba(0,0,0,0.3)',  borderRadius:'10px'}} >
                <div class="titre_info" style={{display:'flex',flexWrap:'wrap',gap:'5px',alignItems:'center',justifyContent:'center', background:'#084442',color:'#fff',padding:'5px 7px',  borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} >
                    <h4 style={{color:'#ffff', textAlign:'center'}}>Details Informations</h4>
                </div>
                <div style={{padding:"5px 10px "}}>
                    <table style={{width:"100%"}} >
                        <tr>
                            <td >Nom:</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Prenom:</td>
                            <td>{prenom}</td>
                        </tr>
                        <tr>
                            <td>Age:</td>
                            <td>{age}</td>
                        </tr>
                        <tr>
                            <td>Profession:</td>
                            <td>{job}</td>
                        </tr>
                        <tr>
                            <td>Pay:</td>
                            <td>{city}</td>
                        </tr>
                        <tr>
                            <td>email:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td style={{display:"flex",flexWrap:'wrap',gap:'5px',alignItems:'center',justifyContent:'center'}}>
                                
                                    <button  class="editer"><Link style={{display:"flex",flexWrap:'wrap',gap:'5px',alignItems:'center',justifyContent:'center'}} to={`/mainCustomer/EditerProfile/${id}`}><FaEdit />Editer</Link></button>
                                    <button onClick={()=>window.history.back()} style={{display:"flex",background: '#222',color:'#fff',
    padding: '2px 3px', flexWrap:'wrap',gap:'5px',alignItems:'center',borderRadius:'5px',justifyContent:'center'}} ><FaArrowLeft />Retour</button> 
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ClientProfile
