import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
    const [nom_utilisateur, setNomUtilisateur] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation des champs
        const errors = {};
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(nom_utilisateur)) {
            errors.nom_utilisateur = 'Le nom d\'utilisateur doit commencer par une lettre et peut contenir des lettres et des chiffres.';
        }
        if (!isValidEmail(email)) {
            errors.email = 'Veuillez entrer une adresse email valide.';
        }
        if (password !== confirm_password) {
            errors.confirm_password = 'Les mots de passe ne correspondent pas.';
        }
        setErrors(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('name', nom_utilisateur);
            try {
                const { data } = await axios.post(`/api/register`, formData);
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                setLoading(false);
                navigate("/");
            } catch (error) {
                const { response } = error;
                console.log(response);
                if (response.status === 422) {
                    setValidationError(response.data.errors);
                } else {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    });
                }
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if (loading) {
        return <h1>Chargement en cours.....</h1>
    }

    return (
        <div className="mainContenairLogin">
            <div className="box-img-Login">
                <h1>Front-Office INSTAT</h1>
                <h4>Microdata</h4>
            </div>
            <div className="formulaire">
                <div className="titre_form">
                    <h2>S'inscrire</h2>
                </div>
                {Object.keys(validationError).length > 0 && (
                    <div className="col-12">
                        <div className="alert alert-danger">
                            <ul className="mb-0">
                                {Object.entries(validationError).map(([key, value]) => (
                                    <li key={key}>{value}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="input_form">
                        <label>Email:</label>
                        <input type="text" placeholder='Email....' onChange={e => setEmail(e.target.value)} />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="input_form">
                        <label>Nom Utilisateur:</label>
                        <input type="text" placeholder='Nom utilisateur....' onChange={e => setNomUtilisateur(e.target.value)} />
                        {errors.nom_utilisateur && <div className="error-message">{errors.nom_utilisateur}</div>}
                    </div>
                    <div className="column">
                        <div className="input_form">
                            <label>Phone Number</label>
                            <input type="number" placeholder="Enter phone number" required />
                        </div>
                        <div className="input_form">
                            <label>Birth Date</label>
                            <input type="date" placeholder="Enter birth date" required />
                        </div>
                    </div>
                    <div className="gender-box">
                        <h3>Gender</h3>
                        <div className="gender-option">
                            <div className="gender">
                                <input type="radio" id="check-male" name="gender" checked />
                                <label for="check-male">male</label>
                            </div>
                            <div className="gender">
                                <input type="radio" id="check-female" name="gender" />
                                <label for="check-female">Female</label>
                            </div>
                            <div className="gender">
                                <input type="radio" id="check-other" name="gender" />
                                <label for="check-other">prefer not to say</label>
                            </div>
                        </div>
                    </div>
                    <div className="input_form address">
                        <label>Address</label>
                        <input type="text" placeholder="Enter street address" required />
                        <input type="text" placeholder="Enter street address line 2" required />
                        <div className="column">
                            <div className="select-box">
                                <select>
                                    <option hidden>Country</option>
                                    <option>America</option>
                                    <option>Japan</option>
                                    <option>India</option>
                                    <option>Nepal</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Enter your city" required />
                        </div>
                        <div className="column">
                            <input type="text" placeholder="Enter your region" required />
                            <input type="number" placeholder="Enter postal code" required />
                        </div>
                    </div>
                    <div className="input_form">
                        <label>Mot de Passe:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Mot de passe...' />
                    </div>
                    <div className="input_form">
                        <label>Confirmer Mot de Passe:</label>
                        <input type="password" value={confirm_password} onChange={e => setConfirm_password(e.target.value)} placeholder='Confirmer mot de passe...' />
                        {errors.confirm_password && <div className="error-message">{errors.confirm_password}</div>}
                    </div>
                    <input type="submit" value="S'inscrire" />
                    <p>Vous avez déjà un compte ? <Link to="/login">Se connecter</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
