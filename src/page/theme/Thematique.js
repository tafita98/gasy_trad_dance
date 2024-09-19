
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { useAuth } from '../../context/AuthProvider';
import Loading from '../../component/Loading';
function Thematique() {
    const [loading, setLoading] = useState(false);
    const user = useAuth();
    const [themes, setThemes] = useState([]);
    // récupérer tous les thèmes
    useEffect(() => {
        fetchThemes();
        // eslint-disable-next-line 
    }, []); // eslint-disable-next-line 

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
            console.log(error, "Une erreur s'est produite lors de la récupération des thèmes.");
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <Loading/>;
    }
    return (
        <footer>
            <div class="content">
                {themes.map((theme) => (
                    <div class="right box">
                        <li key={theme.id}>  {theme.name}</li>
                    </div>
                ))}
            </div>
        </footer>
    )
}

export default Thematique
