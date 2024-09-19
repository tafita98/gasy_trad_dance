// import React, { useState } from "react";
// import { Link } from 'react-router-dom';
// import logo_instat from "../../Saved Pictures/logo_nouveau_instat.png";
// import { useAuth } from "../../context/AuthProvider";
// import ReCAPTCHA from 'react-google-recaptcha';
// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const auth = useAuth();


//     const [captchaToken, setCaptchaToken] = useState(null);
//     const handleCaptcha = (value) => {
//         setCaptchaToken(value);
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         // Validation des champs
//         const errors = {};

//         if (!isValidEmail(email)) {
//             errors.email = 'Veuillez entrer une adresse email valide.';
//         }
//         if (!captchaToken) {
//             errors.captchaToken = 'Veuillez compléter le CAPTCHA.';
//         }

//         setErrors(errors);

//         // Si aucune erreur de validation, envoi de la requête
//         if (Object.keys(errors).length === 0) {
//             const formData = new FormData();
//             formData.append('email', email);
//             formData.append('password', password);
//             // envoie de donne aux login de authprovider
//             auth.loginAction(formData);
//             return;
//         } else {
//             console.log("valider le formulaire");

//         }
//     };

//     function isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }


//     return (
//         <div className="mainReg ">

//             <div className="formulaireLogin">
//                 <div className="titre_form">
//                     <img src={logo_instat} alt="" className="profile" />
//                     <h1>Instat Microdonne</h1>
//                     <h2>Login</h2>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="input_form">
//                         <input type="text" placeholder='Email....' onChange={e => setEmail(e.target.value)} required />
//                         {errors.email && <div className="error-message">{errors.email}</div>}
//                     </div>
//                     <span />
//                     <div className="input_form">
//                         <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Mot de passe...' required />
//                     </div>
//                     <div className="column chexboxlog">
//                         <ReCAPTCHA

//                             sitekey="6LeZ6kcqAAAAAOExaqEUk7uKUVnw_z2DtVKG1uXQ"
//                             onChange={handleCaptcha}
//                         />
//                     </div>
//                     <div className="input_form">
//                         <input type="submit" value="Se connecter" />
//                     </div>

//                     <p>Vous n'avez pas de compte ? <Link to="/inscrire">S'inscrire</Link></p>
//                     <p><Link to="/motpasseoublie">Mot de passe oublié?</Link></p>
//                 </form>
//             </div>

//         </div>
//     )
// }

// export default Login
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo_instat from "../../Saved Pictures/logo_nouveau_instat.png";
import { useAuth } from "../../context/AuthProvider";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const auth = useAuth();
    const [acceptedTerms, setAcceptedTerms] = useState(false); // État pour le checkbox
    const handleSubmit = async (e) => {
        e.preventDefault();


        // Validation des champs
        const errors = {};

        if (!isValidEmail(email)) {
            errors.email = 'Veuillez entrer une adresse email valide.';
        }
        if (!acceptedTerms) {
            errors.acceptedTerms = 'Vous devez cocher que vous n\'êtes pas un robot! .';
        }

        setErrors(errors);

        // Si aucune erreur de validation, envoi de la requête
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            // envoie de donne aux login de authprovider
            auth.loginAction(formData);
            return;
        } else {
            console.log("valider le formulaire");

        }
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    return (
        <div className="mainReg ">
        
                <div className="formulaireLogin">
                    <div className="titre_form">
                        <img src={logo_instat} alt="" className="profile" />
                        <h1>Instat Microdonne</h1>
                        <h2>Login</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input_form">
                            <input type="text" placeholder='Email....' onChange={e => setEmail(e.target.value)} required />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <span/>
                        <div className="input_form">
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Mot de passe...'  required/>
                        </div>
                        <div className="column chexboxlog">
                        <input type="checkbox"
                            id="horns"
                            name="horns"
                            checked={acceptedTerms}
                            onChange={e => setAcceptedTerms(e.target.checked)} />
                       je ne suis pas un robot
                        {errors.acceptedTerms && <p style={{ color: 'red' }}>{errors.acceptedTerms}</p>}
                        </div>
                        <div className="input_form">
                            <input type="submit" value="Se connecter" />
                        </div>
                       
                        <p>Vous n'avez pas de compte ? <Link to="/inscrire">S'inscrire</Link></p>
                        <p><Link to="/motpasseoublie">Mot de passe oublié?</Link></p>
                    </form>
                </div>
           
        </div>
    )
}

export default Login
