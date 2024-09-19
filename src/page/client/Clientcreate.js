import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo_instat from "../../Saved Pictures/logo_nouveau_instat.png";
import ReCAPTCHA from 'react-google-recaptcha';
import LoadingLog from "../../component/LoadingLog";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Clientcreate() {
    const [nom_utilisateur, setNomUtilisateur] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [city, setCity] = useState('');
    const [genre, setGenre] = useState('');
    const [phone, setPhone] = useState('');
    const [adresse, setAdresse] = useState('');
    const [entreprise, setEntreprise] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({});
    const [acceptedTerms, setAcceptedTerms] = useState(false); // État pour le checkbox
    const [captchaToken, setCaptchaToken] = useState(null);
    const handleCaptcha = (value) => {
        setCaptchaToken(value);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
        if (!genre) {
            errors.genre = 'Vous devez sélectionner un genre.';
        }
        if (!acceptedTerms) {
            errors.acceptedTerms = 'Vous devez accepter les conditions générales d\'utilisation.';
        }
        if (password !== confirm_password) {
            errors.confirm_password = 'Les mots de passe ne correspondent pas.';
        }
        if (!captchaToken) {
            errors.captchaToken = 'Veuillez compléter le CAPTCHA.';
        }
        setErrors(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('name', nom_utilisateur);
            formData.append('age', age);
            formData.append('job', job);
            formData.append('city', city);
            formData.append('entreprise', entreprise);
            formData.append('genre', genre);
            formData.append('phone', phone);
            formData.append('adresse', adresse);
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
                if (response && response.status === 422) {
                    setValidationError(response.data.errors);
                } else if (response) {
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

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if (loading) {
        return <LoadingLog />
    }
    if (show) {
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Instat Microdonne</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> <h3 id="condition">Condition général d'utilisation</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel fermentum eros. Integer
                            viverra facilisis velit, sit amet vulputate urna consectetur vitae. Sed tristique augue eu
                            tincidunt mattis. Morbi urna nibh, dapibus ut tristique ac, pulvinar eu arcu.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel fermentum eros. Integer
                            viverra facilisis velit, sit amet vulputate urna consectetur vitae. Sed tristique augue eu
                            tincidunt mattis. Morbi urna nibh, dapibus ut tristique ac, pulvinar eu arcu.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel fermentum eros. Integer
                            viverra facilisis velit, sit amet vulputate urna consectetur vitae. Sed tristique augue eu
                            tincidunt mattis. Morbi urna nibh, dapibus ut tristique ac, pulvinar eu arcu.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel fermentum eros. Integer
                            viverra facilisis velit, sit amet vulputate urna consectetur vitae. Sed tristique augue eu
                            tincidunt mattis. Morbi urna nibh, dapibus ut tristique ac, pulvinar eu arcu.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel fermentum eros. Integer
                            viverra facilisis velit, sit amet vulputate urna consectetur vitae. Sed tristique augue eu
                            tincidunt mattis. Morbi urna nibh, dapibus ut tristique ac, pulvinar eu arcu.</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="fermer" onClick={handleClose}>
                            Fermer
                        </button>

                    </Modal.Footer>
                </Modal>
            </>)
    }

    return (

        <section className="containerReg">
            <div className="titre_form">
                <img src={logo_instat} alt="" className="profile" />
            </div>

            <header>
                <h1>Instat Microdonne</h1>
                S'inscrire
            </header>
            {Object.keys(validationError).length > 0 && (
                <div className="col-12">
                    <div className="alert alert-danger">
                        <ul className="mb-0" style={{ color: "red" }}>
                            {Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="form">
                <div className="column">
                    <div className="input-box">
                        <label>Nom</label>
                        <input type="text" placeholder="Enter nom" onChange={e => setNomUtilisateur(e.target.value)} required />
                        {errors.nom_utilisateur && <div className="error-message">{errors.nom_utilisateur}</div>}
                    </div>
                    <div className="input-box">
                        <label>Prenom</label>
                        <input type="text" placeholder="Enter prenom" onChange={e => setPrenom(e.target.value)} required />
                        {errors.prenom && <div className="error-message">{errors.prenom}</div>}
                    </div>
                </div>
                <div className="input-box">
                    <label>Email Address</label>
                    <input type="text" placeholder="Enter email address" onChange={e => setEmail(e.target.value)} required />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="gender-box">
                    <h3>Genre</h3>
                    <div className="select-box">
                            <select placeholder="Genre" name="age" id="age" onChange={(event) => setGenre(event.target.value)}>
                                <option selected value="">Selectionner Genre ci-dessous</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="prefere ne pas dire">prefere ne pas dire</option>
                            </select>
                        </div>
                   
                </div>
                <div className="input-box address">

                    <div className="column">
                        <input type="number" placeholder="Enter phone number" onChange={e => setPhone(e.target.value)} required />
                        <div className="select-box">
                            <select placeholder="Tranche d'age" name="age" id="age" onChange={(event) => setAge(event.target.value)}>
                                <option selected value="">Tranche d'age</option>
                                <option value="20-30">20-30</option>
                                <option value="30-40">30-40</option>
                                <option value="40-50">40-50</option>
                            </select>
                        </div>
                    </div>
                    <div className="column">
                        <input type="text" placeholder="Enter street address" onChange={e => setAdresse(e.target.value)} required />
                        <div className="select-box">
                            <select onChange={(event) => setCity(event.target.value)}>
                                <option hidden>Pay</option>
                                <option>Madagascar</option>
                                <option>America</option>
                                <option>Japan</option>
                                <option>India</option>
                                <option>Nepal</option>
                            </select>
                        </div>
                    </div>
                    <div className="column">
                        <input type="text" placeholder="Enter your Entreprise" onChange={e => setEntreprise(e.target.value)} required />
                        <input type="text" placeholder="Enter post" onChange={(event) => setJob(event.target.value)} required />
                    </div>
                    <div className="column">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Mot de passe...' />
                        <input type="password" value={confirm_password} onChange={e => setConfirm_password(e.target.value)} placeholder='Confirmer mot de passe...' />
                        {errors.confirm_password && <div className="error-message">{errors.confirm_password}</div>}
                    </div>
                </div>
                <div className="column chexboxlog" style={{marginTop:"5px"}}>
                        <ReCAPTCHA

                            sitekey="6LeZ6kcqAAAAAOExaqEUk7uKUVnw_z2DtVKG1uXQ"
                            onChange={handleCaptcha}
                        />
                    </div>
                <div className="column">
                    <input type="checkbox"
                        id="horns"
                        name="horns"
                        checked={acceptedTerms}
                        onChange={e => setAcceptedTerms(e.target.checked)} />
                    <Button variant="primary" onClick={handleShow}>J'accepte les conditions générale
                        d'utilisation</Button>

                    {errors.acceptedTerms && <p style={{ color: 'red' }}>{errors.acceptedTerms}</p>}
                </div>
                <div className="input-box">
                    <input type="submit" value="Entrer" />
                </div>
                <p>Vous avez déjà un compte ? <Link to="/login">Se connecter</Link></p>
            </form>
        </section>


    );
}

export default Clientcreate;
