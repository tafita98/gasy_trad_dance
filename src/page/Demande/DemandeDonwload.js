import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../component/Loading';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function ClientProfile() {
    const { id } = useParams();
    const [motif, setMotif] = useState('');
    const [email, setEmail] = useState('');
    const [EmailUser, setEmailUser] = useState('');
    const [id_user, setId_user] = useState('');
    const user = useAuth();
    const [image, setImage] = useState();
    const [title, settitle] = useState('');
    const [themes, setThemes] = useState([]);
    const [themeListes, setThemeListes] = useState([]);
    const [enquetes, setEnquetes] = useState([]);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState({});
    const navigate = useNavigate();
    const errors = {};

    const fetchMicrodata = useCallback(async () => {
        setLoading(true);

        await axios.post(`/api/microdataTelecharger`, { id }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({ data }) => {
            setLoading(false);

            const { titre, description, name, nom, image } = data.donnees[0];
            settitle(titre);
            setDescription(description);
            setThemes(name);
            setEnquetes(nom);
            setImage(image);
        }).catch(({ response }) => {
            setLoading(false);
            if (response.status === 422) {
                Swal.fire({
                    text: response.data.errors,
                    icon: "error"
                });
            } else if (response.status === 401) {
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
    }, [id, navigate, user.token]);

    useEffect(() => {
        fetchMicrodata();
    }, [fetchMicrodata]);

    const fetchEmail = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/users/${localStorage.getItem("auth_id")}`,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            const { id, email } = response.data.user
            setEmailUser(email);
            setId_user(id);
        } catch (error) {
            setLoading(false);
            const { response } = error;
            console.log(response);
            if (response && response.status === 422) {
                Swal.fire({
                    text: response.data.errors,
                    icon: "error"
                });
            } else if (response && response.status === 401) {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                });
            } else if (response) {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                });
            } else {
                Swal.fire({
                    text: "Une erreur s'est produite sur la récuperation de theme.",
                    icon: "error"
                });
            }
        }
    }, [user.token]);

    useEffect(() => {
        fetchEmail();
    }, [fetchEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!motif.trim()) {
            errors.description = 'Le motif ne peut pas être vide.';
        }
        if (!isValidEmail(email)) {
            errors.email = 'Veuillez entrer une adresse email valide.';
        }
        if (email !== EmailUser) {
            errors.EmailUser = 'Email est different de vos email d\'inscription!';
        }
        setValidationError(errors);
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                const { data } = await axios.post(`/api/demandeDonwload`, { microdatas_id: id, users_id: id_user, motif }, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                navigate("/mainCustomer/demandeDonwload");
            } catch (error) {
                const { response } = error;
                console.log(response);
                if (response && response.status === 422) {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    });
                } else if (response && response.status === 401) {

                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    });
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

    // recuperation de themes
      // récupérer tous les thèmes
      useEffect(() => {
        fetchThemes();
         // eslint-disable-next-line 
    }, []); // eslint-disable-next-line 

    const fetchThemes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/themes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setThemeListes(response.data);
        } catch (error) {
            Swal.fire({
                text: "Une erreur s'est produite.",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading/>
    }

    return (
        <div className="mainContenair">
            <footer>
            <h4>Demande téléchargement </h4>
                <h5>cet type de microdonne necessite d'être validé par le responsable.  </h5>
                <div class="content">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', backgroud: '#fff', padding: '10px 15px' }}>

                        <div class="cote_gauche" >
                            <img src={`http://localhost:8000/microdata/image/${image}`} alt="" className="profile" />
                        </div>
                        <div class="cote_droit" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '5px', border: '1px solid #ccc', height: '100%', width: '500px', background: '#ffff', boxShadow: '0 0 8px rgba(0,0,0,0.3)', borderRadius: '10px' }} >
                            <div class="titre_info" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center', background: '#DAA520', color: '#fff', padding: '5px 7px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                                <h4 style={{ color: '#ffff', textAlign: 'center' }}>Details Informations</h4>
                            </div>
                            <div style={{ padding: "5px 10px " }}>
                                <table style={{ width: "100%" }} >
                                    <tr>
                                        <td >Titre:</td>
                                        <td>{title}</td>
                                    </tr>
                                    <tr>
                                        <td>Description:</td>
                                        <td>{description}</td>
                                    </tr>
                                    <tr>
                                        <td>Theme:</td>
                                        <td>{themes}</td>
                                    </tr>
                                    <tr>
                                        <td>Enquete:</td>
                                        <td>{enquetes}</td>
                                    </tr>
                                    <tr>
                                        <td>Date Mise en ligne:</td>
                                        <td>12/12/23</td>
                                    </tr>
                                   
                                   
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="right box">
                        <div class="topic">Veullez remplir les champs ci-dessous pour vérification</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input_form">
                                <label>Motif de demande:</label>
                                <input type="text" name="motif" placeholder="pour..." onChange={(event) => setMotif(event.target.value)} />
                                {validationError.motif && <div className="error-message">{validationError.motif}</div>}
                            </div>
                            <div className="input_form">
                                <label>Verification  email:</label>
                                <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
                                {validationError.email && <div className="error-message">{validationError.email}</div>}
                                {validationError.EmailUser && <div className="error-message">{validationError.EmailUser}</div>}
                            </div>
                            <div className="input_form">
                                <input type="submit" title="ajout_place" value="Entrer" />
                                <button onClick={()=>window.history.back()} style={{width:'100%', display:"flex",background: '#222',color:'#fff',
    padding: '5px 10px', flexWrap:'wrap',gap:'5px',alignItems:'center',borderRadius:'5px',justifyContent:'center'}} >Annuler la demande</button>
                            </div>
                        </form>
                    </div>
                </div>
            </footer>
            <footer>
            <h4>Decouvrir d'autres thèmes </h4>
        <div class="content">
            {themeListes.map((theme) => (
                <div class="middle box">
                    <h5 key={theme.id}> <Link to={`/mainCustomer/donneListe/${theme.name}`} > {theme.name} </Link></h5>
                </div>
            ))}
        </div>
    </footer>
        </div>
    );
}

export default ClientProfile;
