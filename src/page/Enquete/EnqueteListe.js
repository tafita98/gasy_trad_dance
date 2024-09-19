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

function EnqueteListe() {
    const [enquete, setEnquetes] = useState([]);
    const [filtre, setFiltre] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAuth();
    const fetchenquetes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/enquetes',
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
            setLoading(false);
            setEnquetes(response.data);

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

        fetchenquetes();
        // eslint-disable-next-line
    }, []);

    const handleChangeFiltre = (e) => {
        setFiltre(e.target.value);
    };

    let enqueteFiltres = enquete;
    if (filtre.trim() !== '') {
        enqueteFiltres = enquete.filter((enquetes) => {
            return enquetes.nom.toLowerCase().includes(filtre.toLowerCase());
        });
    }

    const itemsPerPage = 5;
    const [page, setPage] = useState(1);



    const indexOfLastenquetes = page * itemsPerPage;
    const indexOfFirstenquetes = indexOfLastenquetes - itemsPerPage;
    const currentenquete = enqueteFiltres.slice(indexOfFirstenquetes, indexOfLastenquetes);

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(enqueteFiltres.length / itemsPerPage);

    // Gérer les changements de page
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    // pour supprimer le enquetes
    const deleteenquetes = async (id) => {
        const isConfirm = await swal({
            title: 'Voulez-vous vraiment supprimer cet enquetes?',
            text: "Vous ne pouvez plus le récupérer",
            icon: 'warning',
            buttons: ['Annuler', 'Oui, supprimer le '],
            dangerMode: true,
        });
        if (!isConfirm) {
            return;
        }
        await axios.delete(`/api/enquetes/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchenquetes();


        }).catch(({ response: { data } }) => {
            toast.error(data.message);
        })
    };
    if (loading) {
        return <Loading />
    }

    return (
        <div class="mainContenair">
            <ToastContainer />
            <h3>Toutes les  enquetes</h3>
            <div class="dessu_table">
                <div class="cherch">
                    <input type="text"
                        value={filtre}
                        onChange={handleChangeFiltre}
                        placeholder="Chercher  nom..."
                        className='liste-input-container' />
                    <i className="bx bx-search search-icon"></i>
                </div>
                <Link className='a' to="/main/enqueteAjout"> <FaPlusCircle />Ajouter </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Annee</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentenquete.map((enquetes, index) => (


                        <tr key={index}>
                            <td>{enquetes.id}</td>
                            <td>{enquetes.nom}</td>
                            <td>{new Date(enquetes.annee).toLocaleString('fr-FR', {
                                        weekday: 'short', // 'short' ou 'narrow' pour des formats plus courts
                                        year: 'numeric',
                                        month: 'short', // 'short' pour des mois abrégés

                                    })}</td>
                            <td>{enquetes.description}</td>
                            <td className='action'>
                                <Link to={`/main/enqueteEdit/${enquetes.id}`} className='editer'><FaEdit />Modifier</Link>
                                <button className="supprimer" onClick={() => deleteenquetes(enquetes.id)}>  <FaTrash />Supprimer</button>
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
    )
}

export default EnqueteListe

