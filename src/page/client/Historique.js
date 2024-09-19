import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../component/Loading';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function History() {
    const [demande, setDemandes] = useState([]);

    const [filtre, setFiltre] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAuth();
    const fetchdemandes = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/getHistory', { users_id: localStorage.getItem("auth_id") },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            setDemandes(response.data.historique);

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
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchdemandes();
        // eslint-disable-next-line
    }, []);


    const handleChangeFiltre = (e) => {
        setFiltre(e.target.value);
    };

    let demandeFiltres = demande;
    if (filtre.trim() !== '') {
        demandeFiltres = demande.filter((demandes) => {
            return demandes.titre.toLowerCase().includes(filtre.toLowerCase());
        });
    }

    const itemsPerPage = 5;
    const [page, setPage] = useState(1);



    const indexOfLastdemandes = page * itemsPerPage;
    const indexOfFirstdemandes = indexOfLastdemandes - itemsPerPage;
    const currentdemande = demandeFiltres.slice(indexOfFirstdemandes, indexOfLastdemandes);
    // Calcul du nombre total de pages
    const totalPages = Math.ceil(demandeFiltres.length / itemsPerPage);

    // Gérer les changements de page
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    if (loading) {
        return <Loading />
    }
    console.log(currentdemande);
    return (
        <div className="mainContenair">
            <ToastContainer />
            <div className="mainCo">
                <div className="TableD">
                    <div className="title_table">
                        <h3>Toutes vos Telechargements  </h3>
                    </div>
                   
                    <span/>
                    <div className="corpTableD">
                    <div style={{marginBottom:"10px"}}/>
                        <div class="dessu_table"  >
                      
                            <div class="cherch" style={{marginTop:"40px"}}>
                                <input type="text"
                                    value={filtre}
                                    onChange={handleChangeFiltre}
                                    placeholder="Chercher  titre objet..."
                                    className='liste-input-container' />
                                <i className="bx bx-search search-icon"></i>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Microdata</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentdemande.map((demandes, index) => (


                                    <tr key={index}>
                                        <td> <Link to={`/mainCustomer/voirMicrodataC/${demandes.microdatas_id}`}>
                                        {demandes.titre}
                                </Link></td>
                                        <td>{new Date(demandes.created_at).toLocaleDateString('fr-FR', {
                                        weekday: 'short', // 'short' ou 'narrow' pour des formats plus courts
                                        year: 'numeric',
                                        month: 'short', // 'short' pour des mois abrégés
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',

                                    })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            {/* Désactivation du bouton "Précédent" si on est sur la première page */}
                            <button
                                className='prev-next'
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                            >
                                Précédent
                            </button>

                            {/* Désactivation du bouton "Suivant" si on est sur la dernière page */}
                            <button
                                className='prev-next'
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History

