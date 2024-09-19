import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../component/Loading';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function DemandeListeCustomer() {
    const [demande, setDemandes] = useState([]);
    const [demandeDonwload, setDemandeDonwload] = useState([]);
    const [filtre, setFiltre] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAuth();
    const fetchdemandes = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/demandeData', { id: localStorage.getItem("auth_id") },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            setDemandes(response.data.donnees);

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

    // demande donwload
    const fetchdemandesDonwload = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/downloadData', { id: localStorage.getItem("auth_id") },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            setDemandeDonwload(response.data.donnees);

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

        fetchdemandesDonwload();
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
    // pour supprimer le demandes
    const deletedemandes = async (id) => {
        const isConfirm = await swal({
            title: 'Voulez-vous vraiment supprimer cet demandes?',
            text: "Vous ne pouvez plus le récupérer",
            icon: 'warning',
            buttons: ['Annuler', 'Oui, supprimer le '],
            dangerMode: true,
        });
        if (!isConfirm) {
            return;
        }
        await axios.delete(`/api/demandes/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchdemandes();


        }).catch(({ response: { data } }) => {
            toast.error(data.message);
        })
    };
    if (loading) {
        return <Loading />
    }

    return (
        <div className="mainContenair">
            <ToastContainer />
            <div className="mainCo">
                <div className="overview">

                </div>
                <div className="TableD">
                    <div className="title_table">
                        <h3>Demande</h3>
                    </div>
                    <div className="title">
                    </div>

                    <div className="boxes">
                        <div className="box box1 box-active"><Link to={"/mainCustomer/demande"} >
                            <i className="uil uil-thumbs-up"></i>
                            <span className="text">Demande Spécifique</span>
                            <span className="number">{demande.length}</span>
                        </Link>
                        </div>
                        <div className="box box2">
                            <Link to={"/mainCustomer/demandeDonwload"} >
                                <i className="uil uil-comments"></i>
                                <span className="text">Voir Statut de telechargement</span>
                                <span className="number">{demandeDonwload.length}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="corpTableD">


                        <div class="dessu_table">
                            <div class="cherch">
                                <input type="text"
                                    value={filtre}
                                    onChange={handleChangeFiltre}
                                    placeholder="Chercher  titre objet... nouveau demande"
                                    className='liste-input-container' />
                                <i className="bx bx-search search-icon"></i>
                            </div>
                            <Link className='a' to="/mainCustomer/demandeCreate"> <FaPlusCircle />Nouveau demande</Link>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Description</th>
                                    <th>Motif</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentdemande.map((demandes, index) => (
                                    <tr key={index}>
                                        <td>{demandes.titre}</td>
                                        <td> <div dangerouslySetInnerHTML={{ __html: demandes.description }} /></td>
                                        <td>{demandes.motif}</td>
                                        <td >
                                            <div style={{ background: "#222", color: "#fff", textAlign: "center", borderRadius: "8px", padding: "2px 3px" }} >
                                                {demandes.status}
                                            </div>
                                        </td>
                                        <td >
                                            <div className='action' >
                                                <Link to={`/mainCustomer/demandeEditer/${demandes.id}`} className='editer'><FaEdit />Editer</Link>
                                                <button className="supprimer" onClick={() => deletedemandes(demandes.id)}>  <FaTrash />Supprimer</button>
                                            </div>
                                        </td>
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

export default DemandeListeCustomer

