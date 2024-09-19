import React, { useEffect, useState } from 'react'
import { getNotification } from '../../function/Notification';
import { Link } from 'react-router-dom';
function Notification() {
    const [notifAdmin, setNotifAdmin] = useState([]);

    const fetchNotifAdm = async () => {
        const notifAdminAll = await getNotification();
        setNotifAdmin(notifAdminAll);
    }
    useEffect(() => {
        fetchNotifAdm();
    }, [])

    let NotificationFiltres = notifAdmin;

    const itemsPerPage = 10;
    const [page, setPage] = useState(1);

   

    const indexOfLastnotifications = page * itemsPerPage;
    const indexOfFirstnotifications = indexOfLastnotifications - itemsPerPage;
    const currentnotification = NotificationFiltres.slice(indexOfFirstnotifications, indexOfLastnotifications);
    const totalPages = Math.ceil(NotificationFiltres.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    return (
        <div class="mainContenair">

            <h3>Notifications</h3>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Microdata</th>
                        <th>User</th>
                        <th>Date</th>

                    </tr>
                </thead>
                <tbody>
                    {currentnotification.map((notifications, index) => (
                        <tr key={index}>
                            <td>{notifications.description}</td>
                            <td>
                            <Link to={`/main/voirMicrodata/${notifications.microdatas_id}`}>
                            {notifications.titre}
                                </Link>
                               </td>
                            <td> <Link to={`/main/voirProfil/${notifications.users_id}`}>{notifications.name} </Link></td>
                            <td>{new Date(notifications.created_at).toLocaleString('fr-FR', {
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
    )
}

export default Notification
