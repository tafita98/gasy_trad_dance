import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../component/Loading';
import { getAlltheme } from '../../function/Theme';
import { getAllEnquete } from '../../function/Enquete';
import { FaArrowLeft } from 'react-icons/fa';
import { modifMicrodata, modifMicrodataFile, modifMicrodataImage } from '../../function/Microdata';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// import Swal from 'sweetalert2';
function MicrodataEditer() {
    const { id } = useParams()
    const user = useAuth();
    const [title, settitle] = useState('');
    const [image, setImage] = useState();
    const [fileData, setFileData] = useState("");
    const [themes, setThemes] = useState([]);
    const [theme_id, setTheme_id] = useState([]);
    const [typeDonne, setTypeDonne] = useState([]);
    const [enquetes, setEnquetes] = useState([]);
    const [enquete_id, setEnquete_id] = useState("");
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const [validationError, setValidationError] = useState({});
    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    };

    const fileDataChangeHandler = (event) => {
        setFileData(event.target.files[0]);

    };
    // recuperer le microdata à editer
    useEffect(() => {
        fetchmicrodat()
        // eslint-disable-next-line
    }, [])// eslint-disable-next-line
    const fetchmicrodat = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/microdatas/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            const { titre, description, typeDonne, image, filename, themes_id, enquetes_id } = response.data.microdata
            settitle(titre); setEnquete_id(enquetes_id); setTheme_id(themes_id); setImage(image); setFileData(filename); setDescription(description); setTypeDonne(typeDonne);
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
    // recuperer les themes
    useEffect(() => {
        const fetchThemes = async () => {
            const dataTheme = await getAlltheme();
            setThemes(dataTheme);
        };

        fetchThemes();
        // eslint-disable-next-line
    }, []);

    // récuperer tout les enquetes
    const fetchenquetes = async () => {
        const dataEnquete = await getAllEnquete();
        setEnquetes(dataEnquete);
    };

    useEffect(() => {
        fetchenquetes();
        // eslint-disable-next-line
    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        // Validation des champs
        const errors = {};

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

            formData.append('id', id);
            formData.append('titre', title);
         
            formData.append('description', description);
            formData.append('themes_id', theme_id);
            formData.append('enquetes_id', enquete_id);
            formData.append('typeDonne', typeDonne);
          
           
            setLoading(false);
            await modifMicrodata(formData);


        } else {
            setLoading(false);
        }
    };

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!image) {
            errors.image = 'Veuillez sélectionner une image ';
        }
        
        setValidationError(errors);

        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('id', id);
            if (image !== null) {
                formData.append('image', image);
            }
            // appel fonction sur la modification
            await modifMicrodataImage(formData);
          
        }
    }

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        const errors = {};
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('id', id);
            if (fileData !== null) {
                formData.append('fileData', fileData);
            }
            setValidationError(errors);
            await modifMicrodataFile(formData);
          
        }
    }

    if (loading) {
        return <Loading />
    }
    return (
       
           
            <div className="formulaire">
                 <ToastContainer />
                <div className="titre_form">
                    <h2>Modifier Microdata</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input_form">
                        <label for="">title:</label>
                        <input type="text" name="title" value={title} placeholder='title..' onChange={(event) => settitle(event.target.value)} />
                        {validationError.title && <div classNameName="error-message">{validationError.title}</div>}
                    </div>
                    <div className="input_form">
                        <label for="">Description:</label>
                        <input type="text" name="description" value={description} placeholder='desc...' onChange={(event) => setDescription(event.target.value)} />
                        {validationError.description && <div classNameName="error-message">{validationError.description}</div>}
                    </div>
                    <div className="input_form">
                        <label for="">Type de donnée:</label>
                        <select placeholder="Type de donnée" value={typeDonne} name="TypeDonne" id="TypeDonne" onChange={(event) => setTypeDonne(event.target.value)}>
                            <option selected value="">Type</option>
                            <option value="avec validation">avec validation</option>
                            <option value="sans validation">sans validation</option>
                        </select>
                    </div>                 
                    <div className="input_form">
                        <label for="">Theme:</label>

                        <select id="theme" name="theme" value={theme_id} required onChange={(event) => setTheme_id(event.target.value)} >
                            <option selected value=""> Thèmes</option>
                            {themes.map((theme) => (
                                <option value={theme.id}  >{theme.name}</option>

                            ))}
                        </select>
                    </div>
                    <div className="input_form">
                        <label for="">Enquete:</label>
                        <option selected value="">Enquetes</option>
                        <select id="enquete" name="enquete" value={enquete_id} onChange={(event) => setEnquete_id(event.target.value)} required >

                            {enquetes.map((enquete) => (
                                <option value={enquete.id} >{enquete.nom} </option>
                            ))}
                        </select>
                    </div>
                    <div className="input_form">
                        <input type="submit" title="ajout_place" value="Enregister" />
                    </div>
                </form>
                <form onSubmit={handleSubmitImage}>
                    <div className="input_form">
                        <label for="">Image:</label>
                        <input type="file" name="image" onChange={changeHandler} />
                        <input type="submit" title="ajout_place" value="Changer Image" />
                    </div>
                </form>
                <form onSubmit={handleSubmitFile}>
                    <div className="input_form">
                    <div className="input_form">
                        <label for="">file:</label>
                        <input type="file" name="image" onChange={fileDataChangeHandler} />
                    </div>
                        <input type="submit" title="ajout_place" value="Changer Fichier" />
                    </div>
                </form>
                <div className="button">
                    <button onClick={() => window.history.back()} className='retour'> <FaArrowLeft /> Retour</button>
                </div>
            </div>
            
      
    )
}

export default MicrodataEditer
