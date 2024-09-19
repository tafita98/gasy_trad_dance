import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import logo_instat from "../../Saved Pictures/logo_nouveau_instat.png";
import LoadingLog from "../../component/LoadingLog";
import ReCAPTCHA from "react-google-recaptcha";
function MotdePasseChanger() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState(null);
    const handleCaptcha = (value) => {
        setCaptchaToken(value);
    };
    const [validationError, setValidationError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation des champs
        const errors = {};

        if (!isValidEmail(email)) {
            errors.email = 'Veuillez entrer une adresse email valide.';
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
            try {
                const { data } = await axios.post(`/api/submitResetPasswordForm`, formData);
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                setLoading(false);
                navigate("/login");
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
        return <LoadingLog/>
    }
    return (
        <div className="mainReg">
        
        <div className="formulaireLogin">
              
                <div class="titre_form">
                    <img src={logo_instat} alt="" className="profile" />
                    <h1>Instat Microdonne</h1>
                    <h2>Creer Nouveau Mot de Passe</h2>
                </div>
                {Object.keys(validationError).length > 0 && (

                    <div className="alert-danger">
                        <ul className="mb-0">
                            {Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                            ))}
                        </ul>

                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="input_form">
                        <label>Email:</label>
                        <input type="text" placeholder='Email....' onChange={e => setEmail(e.target.value)} />
                        {errors.email && <div className="error-message">{errors.email}</div>}
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
                    <div className="column chexboxlog" style={{marginTop:"5px"}}>
                        <ReCAPTCHA

                            sitekey="6LeZ6kcqAAAAAOExaqEUk7uKUVnw_z2DtVKG1uXQ"
                            onChange={handleCaptcha}
                        />
                    </div>
                    <input type="submit" value="Modifier" />

                </form>
            </div>
        </div>
    )
}

export default MotdePasseChanger
