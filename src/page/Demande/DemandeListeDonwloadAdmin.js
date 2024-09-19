import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../component/Loading';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function DemandeListeDonwloadAdmin() {

    const [demande, setDemandes] = useState([]);
    const [filtre, setFiltre] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAuth();

    const fetchdemandes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/demandeDonwload', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setLoading(false);
            console.log(response.data);
            setDemandes(response.data);
        } catch (error) {
            const { response } = error;
            console.log(response);
            if (response && response.status === 422) {
                toast.error(response.data.errors);
            } else if (response && response.status === 401) {
                toast.error(response.data.message);
            } else if (response) {
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
            return demandes.nom.toLowerCase().includes(filtre.toLowerCase());
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
        await axios.delete(`/api/demandes/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchdemandes();
        }).catch(({ response: { data } }) => {
            toast.error(data.message);
        });
    };

    // valider demande
    const Validerdemandes = async (microdatas_id, email) => {
        const isConfirm = await swal({
            title: 'Voulez-vous vraiment valider cet demandes?',
            text: "",
            icon: 'warning',
            buttons: ['Annuler', 'Oui, valider le '],
            dangerMode: true,
        });
        if (!isConfirm) {
            return;
        }
        await axios.post(`/api/EnvoieDonneEmail`, { microdatas_id, email }, {
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
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="mainContenair">
            <ToastContainer />
            <h3>Demandes</h3>
            <div className="boxes">
                <div className="box box1">
                    <Link to={"/main/demandeA"}>
                        <i className="uil uil-thumbs-up"></i>
                        <span className="text">Demande Nouveau</span>
                        <span className="number">{demande.length}</span>
                    </Link>
                </div>
                <div className="box box2 box-active">
                    <Link className='link' to={"/main/demandeDonwloadAd"}>
                        <i className="uil uil-comments"></i>
                        <span className="text">Demande Téléchargement</span>
                        <span className="number">{demande.length}</span>
                    </Link>
                </div>
            </div>
            <div className="dessu_table">
                <div className="cherch">
                    <input
                        type="text"
                        value={filtre}
                        onChange={handleChangeFiltre}
                        placeholder="Chercher nom..."
                        className='liste-input-container'
                    />
                    <i className="bx bx-search search-icon"></i>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titre</th>
                        <th>NomInvite</th>
                        <th>Motif</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentdemande.map((demandes, index) => (
                        <tr key={index}>
                            <td>{demandes.id}</td>
                            <td>
                            <Link to={`/main/voirMicrodata/${demandes.microdatas_id}`}>
                            {demandes.titre}
                                </Link>
                               </td>
                            <td> <Link to={`/main/voirProfil/${demandes.users_id}`}>{demandes.name} </Link></td>
                            <td>{demandes.motif}</td>
                           
                            <td>{demandes.status}</td>
                            <td>
                                <div className='action'>
                                    <button className="editer" onClick={() => Validerdemandes(demandes.id, demandes.email)}>  <FaTrash />Valider</button>
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
    );
}

export default DemandeListeDonwloadAdmin;
