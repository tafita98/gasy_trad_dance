import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from "../../component/Loading";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function VerifiToken() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        const activeCompte = async () => {
            setLoading(true);
            try {
                const { data } = await axios.post(`/api/verifyEnvoieDonne`, { token });
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
            
              
                navigate(`/mainCustomer/donwloadFinally/${data.microdatas_id}`);
            } catch (error) {
                const { response } = error;
                if (response && response.status === 422) {
                    setValidationError(response.data.errors);
                } else if (response) {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        text: "Une erreur s'est produite.",
                        icon: "error"
                    });
                }
                setLoading(false);
            }
        };
        activeCompte();
    }, [token, navigate]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div>
            {validationError && (
                <div className="error-message">
                    {Object.entries(validationError).map(([key, value]) => (
                        <p key={key}>{value}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VerifiToken;
