import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/Loading';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function ThemeCustomer() {
  const [themes, setThemes] = useState([]);
  const user = useAuth();
  const [theme, setTheme] = useState("population");
  const [loading, setLoading] = useState(false);
  const [microdata, setMicrodata] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // Nombre d'éléments à afficher par page
  const navigate = useNavigate();

  // Récupérer tous les thèmes
  useEffect(() => {
    fetchThemes();
    // eslint-disable-next-line
  }, []);

  const fetchThemes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/themes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setThemes(response.data);
    } catch (error) {
      handleError(error, "Une erreur s'est produite lors de la récupération des thèmes.");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les données par défaut
  const fetchMicrodata = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/getAlltheme', { theme }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setMicrodata(response.data.donnees);
    } catch (error) {
      handleError(error, "Une erreur s'est produite lors de la récupération des microdatas.");
    } finally {
      setLoading(false);
    }
  }, [theme, user.token]);

  useEffect(() => {
    fetchMicrodata();
    // eslint-disable-next-line
  }, [fetchMicrodata]);

  const handleError = (error, defaultMessage) => {
    const { response } = error;
    let message = defaultMessage;
    if (response) {
      message = response.data.message || response.data.errors || message;
    }
    Swal.fire({
      text: message,
      icon: "error"
    });
    toast.error(message);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const indexOfLastMicrodata = page * itemsPerPage;
  const indexOfFirstMicrodata = indexOfLastMicrodata - itemsPerPage;
  const currentMicrodata = microdata.slice(indexOfFirstMicrodata, indexOfLastMicrodata);

  const totalPages = Math.ceil(microdata.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='mainContenair'>
      <ToastContainer />
      <div className='donne_detail'>
        <section className="gallery" id="gallery">
          <h4>Explorer et partager des données d'enquêtes de <span>l'instat</span> Madagascar</h4>
          <h3 className="section_title">{theme}</h3>
          <div className="section_container">
            <div className="pagination-container">
              {/* Bouton Précédent */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="pagination-button prev-button"
              >
                  <FaAngleLeft />
              </button>
              <div className="gallery_container">
                {currentMicrodata.map((microdata, index) => (
                  <div className="gallery_items" key={index}>
                    <img width="50px" height="50px" src={`http://localhost:8000/microdata/image/${microdata.image}`} alt="" className="profile" />
                    <div className="info">
                      <h5>{microdata.titre}</h5>
                      <p>Recensement/enquête : <span>{microdata.nom}</span></p>
                      <p>Mise en ligne : <span>{new Date(microdata.created_at).toLocaleDateString('fr-FR')}</span></p>
                      <p>Nombre de Téléchargement : <span>{microdata.nbreDownload}</span></p>
                    </div>
                    <div className='voir'>
                      <button className='voirT' onClick={() => {
                        if (microdata.typeDonne === "avec validation") {
                          navigate(`/mainCustomer/demandeDonwload/${microdata.id}`);
                        } else {
                          navigate(`/mainCustomer/demandeDonwloadSanValidation/${microdata.id}`);
                        }
                      }}>
                        <i className="bx bx-cloud-upload"></i> Télécharger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Bouton Suivant */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="pagination-button next-button"
              >
                 <FaAngleRight />
              </button>
            </div>
          </div>

        </section>
      </div>

      <footer>
        <h4>Découvrir d'autres thèmes</h4>
        <div className="content">
          {themes.map((theme) => (
            <div className="middle box" key={theme.id}>
              <h5><span onClick={() => changeTheme(theme.name)}>{theme.name}</span></h5>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default ThemeCustomer;
