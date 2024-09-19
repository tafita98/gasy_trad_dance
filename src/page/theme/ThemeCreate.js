import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import Loading from '../../component/Loading';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// import Swal from 'sweetalert2';
function ThemeCreate() {
    const user = useAuth();
    const [image, setImage] = useState();
    const [name, setName] = useState('');
    const [nbrdonnnee, setNbrdonnnee] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    };
    const [validationError, setValidationError] = useState({});
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        // Validation des champs
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Le name doit commencer par une lettre et peut contenir des lettres et des chiffres.';
        }
        if (!description.trim()) {
            errors.description = 'La description ne peut pas être vide.';
        }
        if (isNaN(parseInt(nbrdonnnee))) {
            errors.nbrdonnnee = 'Le nombre de donne doit être un chiffre.';
        }

        setValidationError(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('nbrdonnnee', nbrdonnnee);
            formData.append('image', image);
            try {
                const { data } = await axios.post(`/api/themes`, formData, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                setLoading(false);
                toast.success(data.message);
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                navigate("/main/themeListe");
            } catch (error) {
                const { response } = error;
                console.log(response);
                if (response && response.status === 422) {

                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    });
                }
                else if (response && response.status === 401) {
                    toast.error(response.data.message);
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    });
                }
                else if (response) {
                    ;
                    Swal.fire({
                        text: response.data.message,
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
        return <Loading />
    }
    return (

        <div className="formulaire">
            <ToastContainer />
            <div className="titre_form">

                <h2>Ajout Nouveau Theme</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input_form">
                    <label for="">Name:</label>
                    <input type="text" name="name" placeholder='name..' onChange={(event) => setName(event.target.value)} />
                    {validationError.name && <div classNameName="error-message">{validationError.name}</div>}

                </div>
                <div className="input_form">
                    <label for="">Nombre Donnee:</label>
                    <input type="text" name="nbrdonnnee" placeholder='nombre..' onChange={(event) => setNbrdonnnee(event.target.value)} />
                    {validationError.nbrdonnnee && <div classNameName="error-message">{validationError.nbrdonnnee}</div>}
                </div>
                <div className="input_form">
                    <label for="">Description:</label>
                    <input type="text" name="description" placeholder='description..' onChange={(event) => setDescription(event.target.value)} />
                    {validationError.description && <div classNameName="error-message">{validationError.description}</div>}
                </div>
                <div className="input_form">
                    <label for="">Image:</label>
                    <input type="file" name="image" onChange={changeHandler} />
                </div>
                <div className="input_form">
                    <input type="submit" name="ajout_place" value="Ajouter" />
                </div>
            </form>
            <div className="button">
                <button onClick={() => window.history.back()} className='retour'> <FaArrowLeft/>  Retour</button>
            </div>
        </div>


    )
}

export default ThemeCreate
