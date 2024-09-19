import React, { useState, useEffect } from "react";

import axios from 'axios';
import { useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import Loading from "../../component/Loading";
import { getUser, ModifProfiUser, ModifProfiUserImage } from "../../function/Utilisateur";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function ModifierProfile() {
    const { id } = useParams()
  
    const [nom_utilisateur, setNomUtilisateur] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
 
    

    const changeHandler = (event) => {
        setProfile(event.target.files[0]);
    };
    useEffect(() => {
        fetchmicrodat()
        // eslint-disable-next-line
    }, [])// eslint-disable-next-line
    const fetchmicrodat = async () => {
     
            const { name, email, prenom, age, job, city } = await getUser(id);
            setNomUtilisateur(name);
            setEmail(email);

            setAge(age);
            setJob(job);
            setCity(city);
            setPrenom(prenom);

     
    }

    if (loading) {
        return <Loading/>
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
       

        // Validation des champs
        const errors = {};

        if (!prenom.trim()) {
            errors.prenom = 'La description ne peut pas être vide.';
        }

        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(nom_utilisateur)) {
            errors.nom_utilisateur = 'Le nom d\'utilisateur doit commencer par une lettre et peut contenir des lettres et des chiffres.';
        }
        if (!isValidEmail(email)) {
            errors.email = 'Veuillez entrer une adresse email valide.';
        }

        setErrors(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('prenom', prenom);
            formData.append('name', nom_utilisateur);
            console.log(age);
            formData.append('age', age);
            formData.append('job', job);
            formData.append('city', city);
            formData.append('id', id);
          
            await ModifProfiUser(formData);
        } else {
            setLoading(false);
        }
    };
    const handleSubmitprofile = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!profile) {
            errors.profile = 'Veuillez sélectionner une profile ';
        }
        
       

        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('id', id);
            if (profile !== null) {
                formData.append('profile', profile);
            }
            // appel fonction sur la modification
            await ModifProfiUserImage(formData);
          
        }
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if (loading) {
        return <h1>Chargement en cours.....</h1>
    }

    return (
        <div class="mainContenair">
            <div className="formulaire">
                <div className="titre_form">
                    <h2>Editer Profile</h2>
                </div>
              
                <form onSubmit={handleSubmit}>
                    <div className="input_form">
                        <input type="text" value={email} placeholder='Email....' readOnly onChange={e => setEmail(e.target.value)} />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="input_form">
                        <input type="text" value={nom_utilisateur} placeholder='Nom utilisateur....' onChange={e => setNomUtilisateur(e.target.value)} />
                        {errors.nom_utilisateur && <div className="error-message">{errors.nom_utilisateur}</div>}
                    </div>
                    <div className="input_form">
                        <input type="text" value={prenom} placeholder='Prenom....' onChange={e => setPrenom(e.target.value)} />
                        {errors.prenom && <div className="error-message">{errors.prenom}</div>}
                    </div>
                    <div className="input_form">
                        <select placeholder="Tranche d'age" value={age} name="age" id="age" onChange={(event) => setAge(event.target.value)}>
                            <option selected value="">Tranche d'age</option>
                            <option value="20-30">20-30</option>
                            <option value="30-40">30-40</option>
                            <option value="40-50">40-50</option>
                        </select>

                    </div>
                    <div className="input_form">
                        <select placeholder="Tranche d'age" value={city} name="city" id="city" onChange={(event) => setCity(event.target.value)}>
                            <option selected value="">Pays</option>
                            <option value="Madagascar">Madagascar</option>

                        </select>

                    </div>
                    <div className="input_form">
                        <select placeholder="Tranche d'age" value={job} name="age" id="age" onChange={(event) => setJob(event.target.value)}>
                            <option selected value="">Professions</option>
                            <option value="secretaire">secretaire</option>
                            <option value="Medecin">Medecin</option>
                            <option value="Professeur">Professeur</option>
                        </select>

                    </div>

                   
                    <div className="input_form">
                        <input type="submit" value="Enregistrer" />
                    </div>


                </form>
                <form onSubmit={handleSubmitprofile}>
                    <div className="input_form">
                        <label for="">profile:</label>
                        <input type="file" name="profile" onChange={changeHandler} />
                        <input type="submit" title="ajout_place" value="Changer profile" />
                    </div>
                </form>
                <button onClick={()=>window.history.back()} style={{display:"flex",background: '#222',color:'#fff',
    padding: '5px 10px', flexWrap:'wrap',gap:'5px',alignItems:'center',borderRadius:'5px',justifyContent:'center'}} ><FaArrowLeft />Retour</button>
            </div>
        </div>
    );
}

export default ModifierProfile;
