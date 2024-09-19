import React, { useState} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../component/Loading';
import { FaArrowLeft } from 'react-icons/fa';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// import Swal from 'sweetalert2';
function DemandeCreate() {
    const user = useAuth();
    const [title, settitle] = useState('');
    const [motif, setMotif] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const errors = {};
    const [validationError, setValidationError] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Validation des champs
        if (!title.trim()) {
            errors.title = 'Le title doit commencer par une lettre et peut contenir des lettres et des chiffres.';
        }
        if (!description.trim()) {
            errors.description = 'La description ne peut pas être vide.';
        }
        setValidationError(errors);
        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('titre', title);
            formData.append('description', description);
            formData.append('motif', motif);
            formData.append('users_id', localStorage.getItem("auth_id"));
          
            try {
                const { data } = await axios.post(`/api/demandes`, formData, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                navigate("/mainCustomer/demande");
            } catch (error) {
                const { response } = error;
                console.log(response);
                if (response && response.status === 422) {
                   
                    Swal.fire({
                        text:response.data.message,
                        icon: "error"
                    });
                } 
                else if (response && response.status === 401) {
                    toast.error(response.data.message);
                    Swal.fire({
                        text:response.data.message,
                        icon: "error"
                    });
                }
                 else if (response) {
                  
                    Swal.fire({
                        text:response.data.message,
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        text: "Une erreur s'est produite.",
                        icon: "error"
                    });
                }
               
                setLoading(false);
                
            } 
        } else {
            setLoading(false);
        }
    };
    
   

    if (loading) {
        return <Loading/>
    }
    return (
        <div className="mainContenair mainForm">
      
      <ToastContainer   />
    
    
            <div className="formulaire">
          
                <div className="titre_form">
               
                    <h2>Effectuer une demande pour un donné</h2>
                </div>
               
                <form onSubmit={handleSubmit}>
                  
                    <div className="input_form">
                        <label for="">Objet:</label>
                        <input type="text" name="title" placeholder='ex: Demande de..' onChange={(event) => settitle(event.target.value)} />
                        {validationError.title && <div classNameName="error-message">{validationError.title}</div>}

                    </div>
                    <div className="input_form">
                        <label for="">Motif de demande:</label>
                        <input type="text" name="motif" placeholder='pour...' onChange={(event) => setMotif(event.target.value)} />
                        {validationError.title && <div classNameName="error-message">{validationError.title}</div>}
                    </div>
                    <div className="input_form">
                        <label for="">Description:</label>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                        <ReactQuill value={description} onChange={setDescription} />

                    
                        {validationError.description && <div classNameName="error-message">{validationError.description}</div>}
                    </div>
                    <div className="input_form">
                    <div className="button">
                        <input type="submit" title="ajout_place" value="Ajouter" />
                      
                       </div>
                    </div>
                    
                </form>
                <div className="button" >
                    <button onClick={() => window.history.back()} className='retour'>  <FaArrowLeft /> Retour</button>
                </div>
            </div>
           
        </div>
    )
}

export default DemandeCreate
