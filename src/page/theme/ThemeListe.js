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

function ThemeListe() {
    const [themes, setThemes] = useState([]);
    const [filtre, setFiltre] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAuth();

    const fetchThemes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/themes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setLoading(false);
            setThemes(response.data);
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
        fetchThemes();
        // eslint-disable-next-line
    }, []);

    const handleChangeFiltre = (e) => {
        setFiltre(e.target.value);
    };

    let themesFiltres = themes;
    if (filtre.trim() !== '') {
        themesFiltres = themes.filter((theme) => {
            return theme.name.toLowerCase().includes(filtre.toLowerCase());
        });
    }

    const itemsPerPage = 5;
    const [page, setPage] = useState(1);

    const indexOfLastTheme = page * itemsPerPage;
    const indexOfFirstTheme = indexOfLastTheme - itemsPerPage;
    const currentThemes = themesFiltres.slice(indexOfFirstTheme, indexOfLastTheme);
    const totalPages = Math.ceil(themesFiltres.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const deleteTheme = async (id) => {
        const isConfirm = await swal({
            title: 'Voulez-vous vraiment supprimer ce thème?',
            text: "Vous ne pouvez plus le récupérer",
            icon: 'warning',
            buttons: ['Annuler', 'Oui, supprimer'],
            dangerMode: true,
        });
        if (!isConfirm) {
            return;
        }
        await axios.delete(`/api/themes/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchThemes();
        }).catch(({ response: { data } }) => {
            toast.error(data.message);
        });
    };
console.log(currentThemes)
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="mainContenair">
            <ToastContainer />
            <h3>Tous les thèmes</h3>
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
                <Link className='a' to="/main/themeCreate">
                    <FaPlusCircle /> Ajouter
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Nombre de donnée</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentThemes.map((theme, index) => (
                        <tr key={index}>
                            <td>
                                      <img width="50px" src={`http://localhost:8000/theme/image/${theme.image}`} alt="img" />
                                      </td>
                           
                            <td>{theme.name}</td>
                            <td>{theme.nbrdonnnee
                            }</td>
                            <td>{theme.description}</td>
                            <td>
                                <div className='action'>
                                    <Link to={`/main/themeEdit/${theme.id}`} className='editer'>
                                        <FaEdit /> Modifier
                                    </Link>
                                    <button className="supprimer" onClick={() => deleteTheme(theme.id)}>
                                        <FaTrash /> Supprimer
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    className='prev-next'
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Précédent
                </button>
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

export default ThemeListe;
