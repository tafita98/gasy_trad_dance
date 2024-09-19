import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import logo_instat from "../../Saved Pictures/logo_nouveau_instat.png";
import LoadingLog from "../../component/LoadingLog";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function MotPassOublie() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation des champs
        const errors = {};
        if (!isValidEmail(email)) {
            errors.email = 'Veuillez entrer une adresse email valide.';
        }
        setErrors(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('email', email);

            try {
                const { data } = await axios.post(`/api/submitForgetPasswordForm`, formData);
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
                    <div className="titre_form">
                        <img src={logo_instat} alt="" className="profile" />
                        <h1>Instat Microdonne</h1>
                        <h2>Mot de passe oublié</h2>
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
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input_form">
                            <label>Email:</label>
                            <input type="text" placeholder='Email....' onChange={e => setEmail(e.target.value)} />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <div className="input-box">
                            <input type="submit" value="Envoyer Email" />
                        </div>
                        <p> <Link to="/inscrire">Voulez-vous vous inscrire ?</Link></p>


                    </form>
                </div>
          
        </div>
    );
}

export default MotPassOublie;
