import React, { useState, useEffect } from 'react';
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
function MicrodataAjout() {
    const user = useAuth();
    const [typeDonne, setTypeDonne] = useState('');
    const [title, settitle] = useState('');
    const [image, setImage] = useState();
    const [fileData, setFileData] = useState("");
    const [themes, setThemes] = useState([]);
    const [theme_id, setTheme_id] = useState([]);
    const [enquetes, setEnquetes] = useState([]);
    const [enquete_id, setEnquete_id] = useState("");
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const [validationError, setValidationError] = useState({});
    const changeHandler = (event) => {
      setImage(event.target.files[0]);
    };
  
    const fileDataChangeHandler = (event) => {
      setFileData(event.target.files[0]);
     
    };
    // recuperer les themes
    useEffect(() => {
      const fetchThemes = async () => {
          setLoading(true);
          try {
              const response = await axios.get('/api/themes',
              {
                  headers: {
                      'Authorization': `Bearer ${user.token}`
                  }
              });
             setThemes(response.data);

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
      };

      fetchThemes();
// eslint-disable-next-line
  }, []);

  // récuperer tout les enquetes
  const fetchenquetes = async () => {
    
    try {
        const response = await axios.get('/api/enquetes',
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        setLoading(false);
        setEnquetes(response.data);

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

            toast.error("Une erreur s'est produite.");
        }
       
    }
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
            formData.append('titre', title);
            formData.append('image', image);
            formData.append('fileData', fileData);
            formData.append('description', description);
            formData.append('themes_id', theme_id);
            formData.append('enquetes_id', enquete_id);
            formData.append('typeDonne', typeDonne);
            console.log(formData);
           
            try {
                const { data } = await axios.post(`/api/microdatas`, formData, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                setLoading(false);
               
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                navigate("/main/microdata");
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
               
                    <h2>Ajout Nouveau Microdata</h2>
                </div>
               
                <form onSubmit={handleSubmit}>
                    <div className="input_form">
                        <label for="">title:</label>
                        <input type="text" name="title" placeholder='title..' onChange={(event) => settitle(event.target.value)} />
                        {validationError.title && <div classNameName="error-message">{validationError.title}</div>}

                    </div>
                    
                    <div className="input_form">
                        <label for="">Description:</label>
                        <input type="text" name="description" placeholder='desc...' onChange={(event) => setDescription(event.target.value)} />
                        {validationError.description && <div classNameName="error-message">{validationError.description}</div>}
                    </div>
                    <div className="input_form">
                        <label for="">Type de donnée:</label>
                        <select placeholder="Type de donnée" name="TypeDonne" id="TypeDonne"  onChange={(event) => setTypeDonne(event.target.value)}>
                                    <option selected value="">Type</option>
                                    <option value="avec validation">avec validation</option>
                                    <option value="sans validation">sans validation</option>
                                    
                        </select>
                        
                    </div>
                    <div className="input_form">
                        <label for="">Image:</label>
                        <input type="file" name="image"  onChange={changeHandler} />
                    </div>
                    <div className="input_form">
                        <label for="">file:</label>
                        <input type="file" name="image"  onChange={fileDataChangeHandler} />
                    </div>
                    <div className="input_form">
                        <label for="">Theme:</label>
                        <select id="theme" name="theme" required onChange={(event) => setTheme_id(event.target.value)} >
                        <option  >Selectionner le thème</option>
                        {themes.map((theme) => (
                                <option value={theme.id}  >{theme.name}</option>
                           
                              ))} 
                    </select>
                    </div>
                    <div className="input_form">
                        <label for="">Enquete:</label>
                        <select id="enquete" name="enquete" onChange={(event) => setEnquete_id(event.target.value)} required >
                        <option  >Selectionner l'enquête'</option>
                        {enquetes.map((enquete) => (
                                <option value={enquete.id} >{enquete.nom} </option>
                           
                              ))} 
                    </select>
                    </div>
                    <div className="input_form">
                        <input type="submit" title="ajout_place" value="Ajouter" />
                    </div>
                </form>
                <div className="button">
                    <button onClick={() => window.history.back()} className='retour'> <FaArrowLeft/> Retour</button>
                </div>
            </div>
           
      
    )
}

export default MicrodataAjout
