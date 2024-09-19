import Log1 from "../../Saved Pictures/26642.jpg";
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';
import Loading from "../../component/Loading";

function MicrodataAgri() {
  
    const user = useAuth();
    const [theme] = useState("agriculture");
    const [loading, setLoading] = useState(false);
    const [microdata, setMicrodata] = useState([]);

    // récupérer les données par défaut
    const fetchMicrodata = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/getAlltheme', { theme }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setMicrodata(response.data.donnees);
        } catch (error) {
            handleError(error, "Une erreur s'est produite lors de la récupération des microdatas.");
        } finally {
            setLoading(false);
        }
    }, [theme, user.token]);

    useEffect(() => {
        fetchMicrodata();
        // eslint-disable-next-line 
    }, [fetchMicrodata]); // eslint-disable-next-line 

    const handleError = (error, defaultMessage) => {
        const { response } = error;
        console.log(response);
        let message = defaultMessage;
        if (response) {
            message = response.data.message || response.data.errors || message;
        }
        Swal.fire({
            text: message,
            icon: "error"
        });
        toast.error(message);
    };

    

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className='mainContenair'>
            <ToastContainer />
            <div className='donne_detail'>
                {/* <!-- Gallery Section --> */}
                
                    <h2 class="section_title">{theme}</h2>
                    <div class="section_container">
                        <div class="gallery_container">
                            {microdata.map((microdata, index) => (
                                <div class="gallery_items">
                                    <img width="50px" height="50px" src={Log1} alt="" className="profile" />
                                    <div class="info">
                                        <h5>{microdata.titre}</h5>
                                        <p>Recensement/enquête : <span>{microdata.nom}</span></p>
                                        <p>Année de données : <span>{microdata.timestamp}</span></p>
                                        <p>Mise en ligne : <span>12/12/2022</span></p>
                                    </div>
                                    <div className='voir'>
                                        <Link to={`/mainCustomer/demandeDonwload/${microdata.id}`} className='voirT'>
                                            <i className="bx bx-cloud-upload"></i>
                                            Télécharger
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
              
            </div>


        </div>
    );
}

export default MicrodataAgri;
