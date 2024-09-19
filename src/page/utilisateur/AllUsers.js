import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../function/Utilisateur'
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AllUsers() {
    const [users, setUsers] = useState([]);
    const user = useAuth()
    const [filtre, setFiltre] = useState('');
    const [loading, setLoading] = useState(false);
    // appel fonction AllUsers
    const fetchUsers = async () => {
        setLoading(true);
        const UsersData = await getAllUser();
        setUsers(UsersData);
        setLoading(false);
    }
    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, [])

    console.log(users);

    // pagination
    const handleChangeFiltre = (e) => {
        setFiltre(e.target.value);
    };

    let userFiltres = users;
    if (filtre.trim() !== '') {
        userFiltres = users.filter((users) => {
            return users.name.toLowerCase().includes(filtre.toLowerCase());
        });
    }

    const itemsPerPage = 5;
    const [page, setPage] = useState(1);



    const indexOfLastusers = page * itemsPerPage;
    const indexOfFirstusers = indexOfLastusers - itemsPerPage;
    const currentusers = userFiltres.slice(indexOfFirstusers, indexOfLastusers);
    // Calcul du nombre total de pages
    const totalPages = Math.ceil(userFiltres.length / itemsPerPage);

    // Gérer les changements de page
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    // pour supprimer l'utilisateur
    const deleteUsers = async (id) => {
        const isConfirm = await swal({
            title: 'Voulez-vous vraiment supprimer cet utilisateur?',
            text: "Vous ne pouvez plus le récupérer",
            icon: 'warning',
            buttons: ['Annuler', 'Oui, supprimer le '],
            dangerMode: true,
        });
        if (!isConfirm) {
            return;
        }
        await axios.delete(`/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchUsers();


        }).catch(({ response: { data } }) => {
            toast.error(data.message);
        })
    };

    if (loading) {
        return <h1>Chargement en cours,Veuillez patientez s'il vous plait.....</h1>
    }
    return (
        <div className="mainContenair">
            <ToastContainer />
            <h3>Toutes les utilisateurs </h3>
            <div class="dessu_table">
                <div class="cherch">
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
                        <th>Profile </th>
                        <th>Id </th>
                        <th>Nom </th>
                        <th>Prenom</th>
                        <th>Age</th>
                        <th>city</th>
                        <th>job</th>
                        <th>entreprise</th>
                        <th>genre</th>
                        <th>Adresse</th>
                        <th>phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentusers.map((users, index) => (
                        <tr key={index}>
                            <td><img   src={`http://localhost:8000/user/image/${users.profile}`}  alt="" width="50px" /></td>
                            <td>{users.id}</td>
                            <td>{users.name}</td>
                            <td>{users.prenom}</td>
                            <td>{users.age}</td>
                            <td>{users.city}</td>
                            <td>{users.job}</td>
                            <td>{users.entreprise}</td>
                            <td>{users.genre}</td>
                            <td>{users.adresse}</td>
                            <td>{users.email}</td>
                            <td>{users.phone}</td>
                            <td className='action'>
                                <Link to={`/main/voirProfil/${users.id}`} className='a-voir'><FaEdit />voir</Link>
                                <button className="supprimer" onClick={() => deleteUsers(users.id)}>  <FaTrash />Supprimer</button>
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

export default AllUsers
