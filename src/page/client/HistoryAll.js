import React, { useEffect, useState } from 'react';
import { AllHistory } from '../../function/Historique';
import { Link } from 'react-router-dom';

function HistoryAll() {
    const [filtre, setFiltre] = useState('');
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Appel fonction history
    const fetchHistory = async () => {
        setLoading(true);
        const Histo = await AllHistory();
        setHistories(Histo);
        setLoading(false);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // Filtrage des résultats
    const handleChangeFiltre = (e) => {
        setFiltre(e.target.value);
    };

    let historyFiltres = histories;
    if (filtre.trim() !== '') {
        historyFiltres = histories.filter((historys) => {
            return historys.titre.toLowerCase().includes(filtre.toLowerCase());
        });
    }

    // Calcul des index pour la pagination
    const indexOfLasthistorys = page * itemsPerPage;
    const indexOfFirsthistorys = indexOfLasthistorys - itemsPerPage;
    const currenthistory = historyFiltres.slice(indexOfFirsthistorys, indexOfLasthistorys);

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(historyFiltres.length / itemsPerPage);

    // Gérer les changements de page
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (loading) {
        return <h1>Chargement en cours, Veuillez patienter s'il vous plaît...</h1>;
    }

    return (
        <div className="mainContenair">
            <h3>Les téléchargements effectués par des utilisateurs</h3>
            <div className="dessu_table">
                <div className="cherch">
                    <input
                        type="text"
                        value={filtre}
                        onChange={handleChangeFiltre}
                        placeholder="Chercher titre objet..."
                        className='liste-input-container'
                    />
                    <i className="bx bx-search search-icon"></i>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Microdonnée</th>
                        <th>Client</th>
                        <th>Date de téléchargement</th>
                    </tr>
                </thead>
                <tbody>
                    {currenthistory.map((historys, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/main/voirMicrodata/${historys.microdatas_id}`}>
                                    {historys.titre}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/main/voirProfil/${historys.users_id}`}>
                                    {historys.name}
                                </Link>
                            </td>
                            <td>{new Date(historys.created_at).toLocaleString('fr-FR', {
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

export default HistoryAll;
