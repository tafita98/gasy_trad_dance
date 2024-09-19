
// import population from "../../Saved Pictures/population.PNG";
// import sante from "../../Saved Pictures/sante.jpg";
// import media from "../../Saved Pictures/media.jpg";
// import emploie from "../../Saved Pictures/emploie.jpg";
// import investisement from "../../Saved Pictures/investissement.jpg";
// import transport from "../../Saved Pictures/transport.jpg";
// import agriculture from "../../Saved Pictures/agriculture.jpg";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

import { useAuth } from '../../context/AuthProvider';
import Loading from '../../component/Loading';
function ThemeDetail() {
  const user = useAuth();
  const [loading, setLoading] = useState(false);
  const [themes, setthemes] = useState([]);
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/themes',
          {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
        setLoading(false);
        console.log(response.data)
        setthemes(response.data);

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

    fetchThemes();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Loading />
  }
  if (show) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Instat Microdonne</Modal.Title>
                </Modal.Header>
                <Modal.Body> <h3 id="condition">Microdonne</h3>
                    <p>Microdonne est , consectetur adipiscing elit. Pellentesque vel fermentum eros. Integer
                        viverra facilisis velit, sit amet vulputate urna consectetur vitae. Sed tristique augue eu
                        tincidunt mattis. Morbi urna nibh, dapibus ut tristique ac, pulvinar eu arcu.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel fermentum eros. Integer
                        viverra facilisis velit, sit amet vulputate urna consectetur vitae. Sed tristique augue eu
                        tincidunt mattis. Morbi urna nibh, dapibus ut tristique ac, pulvinar eu arcu.</p>
                  

                </Modal.Body>
                <Modal.Footer>
                    <button className="fermer" onClick={handleClose}>
                        Fermer
                    </button>

                </Modal.Footer>
            </Modal>
        </>)
}
  return (
    <div className="mainContenair">
      <ToastContainer />
      
      <div class="titre-intro">
      <h3> Bienvenue aux Microdonne de l'instat Madagascar</h3> 
      <h4 onClick={handleShow}>c'est quoi un microdonne?</h4>
      </div>
      <h3>Theme</h3>
      <section class="shop-section">
        <div class="shop-images">
          {themes.map((theme) => (
            <div class="shop-link ">
              <img src={`http://localhost:8000/theme/image/${theme.image}`} alt="card" />
              <Link to={`/mainCustomer/donneListe/${theme.name}`}>
                <div class="titleTheme">
                  <h3>{theme.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default ThemeDetail
