import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../component/Loading';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaArrowLeft } from 'react-icons/fa';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function DemandeEdit() {
    const { id } = useParams();
    const user = useAuth();

    const [title, settitle] = useState('');
    const [motif, setMotif] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({});

    useEffect(() => {
        fetchdemande();
        // eslint-disable-next-line
    }, []);

    const fetchdemande = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/getDemande`, { id, users_id: localStorage.getItem("auth_id") },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            const { titre, description, motif } = response.data.demandes[0];
            setDescription(description);
            settitle(titre);
            setMotif(motif);
        } catch (error) {
            const { response } = error;
            console.log(response);
            if (response && response.status === 422) {
                toast.error(response.data.errors);
            } else if (response && response.status === 401) {
                toast.error(response.data.message);
            } else {
                toast.error("Une erreur s'est produite sur la récupération de la demande.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation des champs
        const errors = {};
        if (!title.trim()) {
            errors.title = 'Le titre ne peut pas être vide.';
        }
        if (!description.trim()) {
            errors.description = 'La description ne peut pas être vide.';
        }
        if (!motif.trim()) {
            errors.motif = 'Le motif ne peut pas être vide.';
        }
        setValidationError(errors);

        // Si aucune erreur de validation
        if (Object.keys(errors).length === 0) {
            try {
                const { data } = await axios.put(`/api/demandes/${id}`, { titre: title, description, motif }, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
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
        <div className="mainContenair mainForm">
            <ToastContainer />
            <div className="formulaire">
                <div className="titre_form">
                    <h2>Modifier une demande</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input_form">
                        <label htmlFor="title">Titre:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="ex: Demande de.."
                            onChange={(event) => settitle(event.target.value)}
                        />
                        {validationError.title && <div className="error-message">{validationError.title}</div>}
                    </div>

                    <div className="input_form">
                        <label htmlFor="description">Description:</label>
                        <ReactQuill value={description} onChange={setDescription} />
                        {validationError.description && <div className="error-message">{validationError.description}</div>}
                    </div>

                    <div className="input_form">
                        <label htmlFor="motif">Motif de demande:</label>
                        <input
                            type="text"
                            name="motif"
                            value={motif}
                            placeholder="pour..."
                            onChange={(event) => setMotif(event.target.value)}
                        />
                        {validationError.motif && <div className="error-message">{validationError.motif}</div>}
                    </div>

                    <div className="input_form">
                        <div className="button">
                            <input type="submit" title="ajout_place" value="Modifier" />
                        </div>
                    </div>
                </form>

                <div className="button">
                    <button onClick={() => window.history.back()} className="retour"><FaArrowLeft />Retour</button>
                </div>
            </div>
        </div>
    );
}

export default DemandeEdit;
