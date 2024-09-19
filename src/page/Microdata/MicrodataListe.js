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

function MicrodataListe() {
    const [microdata, setMicrodatas] = useState([]);
    const [filtre, setFiltre] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAuth();
    const fetchmicrodatas = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/microdatas',
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setLoading(false);
            setMicrodatas(response.data);

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
      
        fetchmicrodatas();
// eslint-disable-next-line
    }, []);

    const handleChangeFiltre = (e) => {
        setFiltre(e.target.value);
    };

    let microdataFiltres = microdata;
    if (filtre.trim() !== '') {
        microdataFiltres = microdata.filter((microdatas) => {
            return microdatas.titre.toLowerCase().includes(filtre.toLowerCase());
        });
    }

    const itemsPerPage = 3;
    const [page, setPage] = useState(1);

    const indexOfLastmicrodatas = page * itemsPerPage;
    const indexOfFirstmicrodatas = indexOfLastmicrodatas - itemsPerPage;
    const currentmicrodata = microdataFiltres.slice(indexOfFirstmicrodatas, indexOfLastmicrodatas);

     // Calcul du nombre total de pages
     const totalPages = Math.ceil(microdataFiltres.length / itemsPerPage);

     // Gérer les changements de page
     const handlePageChange = (newPage) => {
         if (newPage > 0 && newPage <= totalPages) {
             setPage(newPage);
         }
     };
    // pour supprimer le microdatas
    const deletemicrodatas = async (id) => {
        const isConfirm = await swal({
            title: 'Voulez-vous vraiment supprimer cet microdatas?',
            text: "Vous ne pouvez plus le récupérer",
            icon: 'warning',
            buttons: ['Annuler', 'Oui, supprimer le '],
            dangerMode: true,
        });
        if (!isConfirm) {
            return;
        }
        await axios.delete(`/api/microdatas/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchmicrodatas();
            
           
        }).catch(({ response: { data } }) => {
            toast.error(data.message);
        })
    };
    if (loading) {
        return <Loading/>
    }

  return (
    <div class="mainContenair">
             <ToastContainer />
    <h3>Toutes les  microdatas</h3>
    <div class="dessu_table">
        <div class="cherch">
            <input  type="text"
                    value={filtre}
                    onChange={handleChangeFiltre}
                    placeholder="Chercher  titre..."
                    className='liste-input-container'/>
                     <i className="bx bx-search search-icon"></i>
            </div>
        <Link className='a' to="/main/microdataAjout"> <FaPlusCircle />Ajouter </Link>
    </div>
    <div  style={{overflowX:"auto"}}>
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Type de donnée</th>
                <th>Theme</th>
                <th>Enquete</th>
                <th>Fichier</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {currentmicrodata.map((microdatas, index) => (
                    
               
                    <tr key={index}>
                                      <td>
                                      <img width="50px" src={`http://localhost:8000/microdata/image/${microdatas.image}`} alt="img" />
                                      </td>
                                    <td>{microdatas.titre}</td>
                                    <td>{microdatas.description}</td>
                                    <td>{microdatas.typeDonne}</td>
                                    <td>{microdatas.name}</td>
                                    <td>{microdatas.nom}</td>
                                    <td>{microdatas.filename}</td>
                                    <td > 
                                    <div className='action'>  
                                    <Link to={`/main/microdataEdit/${microdatas.id}`} className='editer'><FaEdit />Modifier</Link>
                                    <button className="supprimer" onClick={() => deletemicrodatas(microdatas.id)}>  <FaTrash />Supprimer</button>
                                    </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
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

export default MicrodataListe

