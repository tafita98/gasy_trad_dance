import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../component/Loading';
import { FaArrowLeft } from 'react-icons/fa';
// import Swal from 'sweetalert2';
function EnqueteEditer() {
    const { id } = useParams()
    const user = useAuth();

    const [nom, setNom] = useState('');
    const [annee, setAnnee] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [validationError, setValidationError] = useState({});
    useEffect(() => {
        fetchenquete()
        // eslint-disable-next-line
    }, [])// eslint-disable-next-line
    const fetchenquete = async () => {
        setLoading(true);
        await axios.get(`/api/enquetes/${id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({ data }) => {
            setLoading(false);
            const { nom, annee, description } = data.enquete
            setNom(nom);
            setAnnee(annee);
            setDescription(description);
        }).catch(({ response }) => {
            setLoading(false);
            if (response.status === 422) {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                });
            } else if (response.status === 401) {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                });
                navigate("/login");

            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                });
            }
        });
    }



    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        // Validation des champs
        const errors = {};

        if (!nom.trim()) {
            errors.nom = 'Le nom doit être une chaine  de charactère.';
        }
        if (!description.trim()) {
            errors.description = 'La description ne peut pas être vide.';
        }
        if (!annee.trim()) {
            errors.annee = 'L\'annee ne peut pas être vide.';
        }


        setValidationError(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {


            try {
                const { data } = await axios.put(`/api/enquetes/${id}`, { nom, annee, description }, {
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
                navigate("/main/enquete");
            } catch (error) {
                const { response } = error;
                console.log(response);
                if (response && response.status === 422) {
                    toast.error(response.data.message);
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
                    toast.error(response.data.message);
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    });
                } else {
                    toast.error("Une erreur s'est produite.");
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
                <h2>Editer  enquete</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input_form">
                    <label for="">nom:</label>
                    <input type="text" name="nom" value={nom} placeholder='nom..' onChange={(event) => setNom(event.target.value)} />
                    {validationError.nom && <div classNameName="error-message">{validationError.nom}</div>}
                </div>
                <div className="input_form">
                    <label for="">Annee:</label>
                    <input type="text" name="annee" value={annee} placeholder='annee..' onChange={(event) => setAnnee(event.target.value)} />
                    {validationError.annee && <div classNameName="error-message">{validationError.annee}</div>}

                </div>
                <div className="input_form">
                    <label for="">Description:</label>
                    <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                    {validationError.description && <div classNameName="error-message">{validationError.description}</div>}
                </div>

                <div className="input_form">
                    <input type="submit" nom="ajout_place" value="Editer" />
                </div>
            </form>
            <div className="button">
                <button onClick={() => window.history.back()} className='retour'><FaArrowLeft />  Retour</button>
            </div>
        </div>


    )
}

export default EnqueteEditer
