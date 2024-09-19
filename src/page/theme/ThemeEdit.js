import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate , useParams} from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../component/Loading';
import { modifTheme, modifThemeImage } from '../../function/Theme';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// import Swal from 'sweetalert2';
function ThemeEdit() {
    const { id } = useParams()
    const [image, setImage] = useState();
    const user = useAuth();
    const [name, setName] = useState('');
    const [nbrdonne, setnbrdonne] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changeHandler = (event) => {
        setImage(event.target.files[0]);
      };
    const [validationError, setValidationError] = useState({});
    useEffect(()=>{
        fetchTheme()
        // eslint-disable-next-line
      },[])// eslint-disable-next-line
      const fetchTheme = async () => {
        setLoading(true);
        await axios.get(`http://localhost:8000/api/themes/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({data})=>{
            setLoading(false);
          const { name,nbrdonnnee, description } = data.theme
          setName(name);
          setnbrdonne(nbrdonnnee);
          setDescription(description);
        }).catch(({ response }) => {
            setLoading(false);
            if (response.status === 422) {
                Swal.fire({
                    text: response.data.errors,
                    icon: "error"
                  });
            }else if (response.status === 401) {
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
        
       

        // Validation des champs
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Le name doit commencer par une lettre et peut contenir des lettres et des chiffres.';
        }
        if (!description.trim()) {
            errors.description = 'La description ne peut pas être vide.';
        }
        if (isNaN(parseInt(nbrdonne))) {
            errors.nbrdonne = 'Le nombre de donne doit être un chiffre.';
        }

        setValidationError(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
           
            formData.append('id', id);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('nbrdonnnee', nbrdonne);       
            await modifTheme(formData);
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
            await modifThemeImage(formData);
          
        }
    }
   

    if (loading) {
        return <Loading/>
    }
    return (

            <div class="formulaire">
          
                <div class="titre_form">
               
                    <h2>Editer  Theme</h2>
                </div>
               
                <form onSubmit={handleSubmit}>
                    <div class="input_form">
                        <label for="">Name:</label>
                        <input type="text" name="name" value={name} placeholder='name..' onChange={(event) => setName(event.target.value)} />
                        {validationError.name && <div className="error-message">{validationError.name}</div>}

                    </div>
                    <div class="input_form">
                        <label for="">Nombre Donnee:</label>
                        <input type="text" name="nbrdonne" value={nbrdonne} onChange={(event) => setnbrdonne(event.target.value)} />
                        {validationError.nbrdonne && <div className="error-message">{validationError.nbrdonne}</div>}
                    </div>
                    <div class="input_form">
                        <label for="">Description:</label>
                        <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                        {validationError.description && <div className="error-message">{validationError.description}</div>}
                    </div>
                   
                    <div class="input_form">
                        <input type="submit" name="ajout_place" value="Editer" />
                    </div>
                </form>
                <form onSubmit={handleSubmitImage}>
                    <div className="input_form">
                        <label for="">Image:</label>
                        <input type="file" name="image" onChange={changeHandler} />
                        <input type="submit" title="ajout_place" value="Changer Image" />
                    </div>
                </form>
                <div className="button">
                    <button onClick={() => window.history.back()} className='retour'><FaArrowLeft/>  Retour</button>
                </div>
            </div>
            
       
    )
}

export default ThemeEdit
