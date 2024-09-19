import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../component/Loading';
import { FaArrowLeft } from 'react-icons/fa';
// import Swal from 'sweetalert2';
function DirectionAjout() {
    const user = useAuth();
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const [validationError, setValidationError] = useState({});
    const handleSubmit = async (e) => {

        e.preventDefault();
        
        setLoading(true);

        // Validation des champs
        const errors = {};

        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(nom)) {
            errors.nom = 'Le nom doit commencer par une lettre et peut contenir des lettres et des chiffres.';
        }
        if (!description.trim()) {
            errors.description = 'La description ne peut pas être vide.';
        }
      

        setValidationError(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('nom', nom);
            formData.append('description', description);
           
            try {
                const { data } = await axios.post(`/api/directions`, formData, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                setLoading(false);
               
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                navigate("/main/direction");
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
                   ;
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
            <div className="formulaire">
                <ToastContainer   />
                <div className="titre_form">
                    <h2>Ajout Nouveau Direction</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input_form">
                        <label for="">nom:</label>
                        <input type="text" name="nom" placeholder='nom..' onChange={(event) => setNom(event.target.value)} />
                        {validationError.nom && <div classNameName="error-message">{validationError.nom}</div>}
                    </div>
                    <div className="input_form">
                        <label for="">Description:</label>
                        <input type="text" name="description" placeholder='desc...' onChange={(event) => setDescription(event.target.value)} />
                        {validationError.description && <div classNameName="error-message">{validationError.description}</div>}
                    </div>
                    <div className="input_form">
                        <input type="submit" nom="ajout_place" value="Ajouter" />
                    </div>
                </form>
                <div className="button">
                    <button onClick={() => window.history.back()} className='retour'><FaArrowLeft />  Retour</button>
                </div>
            </div>
    )
}

export default DirectionAjout
