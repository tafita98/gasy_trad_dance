import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../component/Loading';
import { creerStory } from '../../function/Historique';
import { FaArrowLeft } from 'react-icons/fa';
// import Swal from 'sweetalert2';
function DonwloadFinally() {
    const { id_p } = useParams()
    const user = useAuth();
    const [title, settitle] = useState('');
    const [image, setImage] = useState('');
    const [fileData, setFileData] = useState("");

    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchmicrodat()
        // eslint-disable-next-line
    }, [])// eslint-disable-next-line
    const fetchmicrodat = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/microdatas/${id_p}`,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            const { titre, description, filename,image } = response.data.microdata
            settitle(titre);
                setImage(image);
            setFileData(filename);
            setDescription(description);

        } catch (error) {
            const { response } = error;
            console.log(response);
            if (response && response.status === 422) {
                toast.error(response.data.errors);
            }
            else if (response && response.status === 401) {
                toast.error(response.data.message);

            }
            else if (response) {
                toast.error(response.data.message);

            } else {

                toast.error("Une erreur s'est produite sur la récuperation de theme.");
            }
        }
    }

    // envoie de fonction pour telecharger
    const downloadFile = async (fileName) => {
        try {
            const response = await axios.get(`/api/download/${fileName}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                responseType: 'blob' // Assurez-vous que responseType est au bon endroit
            });

            // Créer un lien temporaire pour télécharger le fichier
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Nom du fichier à télécharger
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            await creerStory(id_p,localStorage.getItem("auth_id"))
        }catch (error) {
            const { response } = error;
            console.log(response);
            if (response && response.status === 422) {
                toast.error(response.data.errors);

            } 
            else if (response && response.status === 401) {
                toast.error(response.data.message);

            }
             else if (response) {
                toast.error(response.data.message);

            } else {

                toast.error("Une erreur s'est produite.");
            }
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading/>
    }
    return (
        <div class="mainCustomer">
            <ToastContainer />
            <div className="mainCo">
            <h1>Telecharger maintenant</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', backgroud: '#fff', padding: '10px 15px' }}>

                <div class="cote_gauche" >
                    <img src={`http://localhost:8000/microdata/image/${image}`} alt="" className="profile" />
                </div>
                <div class="cote_droit" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '5px', border: '1px solid #ccc', height: '100%', width: '600px', background: '#ffff', boxShadow: '0 0 8px rgba(0,0,0,0.3)', borderRadius: '10px' }} >
                    <div class="titre_info" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center', background: '#425e79', color: '#fff', padding: '5px 7px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                        <h4 style={{ color: '#ffff', textAlign: 'center' }}>Details Informations</h4>
                    </div>
                    <div style={{ padding: "5px 10px " }}>
                        <table style={{ width: "100%" }} >
                            <tr>
                                <td >Titre:</td>
                                <td>{title}</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <td>Date Mise en ligne:</td>
                                <td>12/12/23</td>
                            </tr>
                            <tr>
                                <td>Microdata:</td>
                                <td>{fileData}</td>
                            </tr>
                            
                            <td style={{ display: "flex", flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
                                <div className='voir' style={{ display: "flex", flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
                                    <button style={{ background:"#425e79",color:"#ffff",padding: '5px 10px',borderRadius:"5px"}} className='voirT' onClick={() => downloadFile(fileData)}>
                                        <i className="bx bx-cloud-upload"></i>
                                        Telecharger
                                    </button>
                               
                                </div>
                            </td>

                        </table>
                        <button onClick={()=>window.history.back()} className='retour' ><FaArrowLeft />Retour</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default DonwloadFinally
