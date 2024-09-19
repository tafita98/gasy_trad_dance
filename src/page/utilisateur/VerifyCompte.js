import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function VerifyCompte() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        const activeCompte = async () => {
            setLoading(true);
            try {
                const { data } = await axios.post(`/api/verifyRegister`, { token });
                Swal.fire({
                    icon: "success",
                    text: data.message
                });
                navigate("/");
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
        return <h1>Activation en cours.....</h1>;
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

export default VerifyCompte;
