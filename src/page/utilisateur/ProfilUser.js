import React, { useEffect, useState } from 'react'
import { getUser } from '../../function/Utilisateur';
import { useParams } from 'react-router-dom';
import Loading from '../../component/Loading';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
function ProfilUser() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([]);
    // appel fonction getUser
    const fetchUser = async (id) => {
        setLoading(true);
        const data = await getUser(id);
        setUser(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchUser(id);
        // eslint-disable-next-line 
    }, [id])

    if (loading) {
        return <Loading />
    }
    return (
        <div class="mainContenair">
            <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <h3>Profil utilisateur</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', backgroud: '#fff', padding: '10px 15px' }}>

                    <div class="cote_gauche" >
                        <img src={`http://localhost:8000/user/image/${user.profile}`} alt="" className="profile" />
                    </div>
                    <div class="cote_droit" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '5px', border: '1px solid #ccc', height: '100%', width: '600px', background: '#ffff', boxShadow: '0 0 8px rgba(0,0,0,0.3)', borderRadius: '10px' }} >
                        <div class="titre_info" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center', background: '#084442', color: '#fff', padding: '5px 7px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                            <h4 style={{ color: '#ffff', textAlign: 'center' }}>Details Informations</h4>
                        </div>
                        <div style={{ padding: "5px 10px " }}>
                            <table style={{ width: "100%" }} >
                                <tr>
                                    <td >Nom:</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Prenom:</td>
                                    <td>{user.prenom}</td>
                                </tr>
                                <tr>
                                    <td>Age:</td>
                                    <td>{user.age}</td>
                                </tr>
                                <tr>
                                    <td>Profession:</td>
                                    <td>{user.job}</td>
                                </tr>
                                <tr>
                                    <td>Entreprise:</td>
                                    <td>{user.entreprise}</td>
                                </tr>
                                <tr>
                                    <td>Adresse:</td>
                                    <td>{user.adresse}</td>
                                </tr>
                                <tr>
                                    <td>Pay:</td>
                                    <td>{user.city}</td>
                                </tr>
                                <tr>
                                    <td>Phone:</td>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td>email:</td>
                                    <td>{user.email}</td>
                                </tr>
                                {parseInt(localStorage.getItem("auth_id")) === user.id && (
                                    <tr>
                                        <td style={{ display: "flex", flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>

                                            <button class="editer"><Link style={{ display: "flex", flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center' }} to={`/main/ModifProfileUser/${id}`}><FaEdit />Editer</Link></button>
                                        </td>
                                    </tr>
                                )}
                            </table>
                            <div className="button">
                                <button onClick={() => window.history.back()} className='retour'><FaArrowLeft/>  Retour</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilUser
