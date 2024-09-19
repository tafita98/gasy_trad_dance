import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import LoadingLog from "../component/LoadingLog";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const loginAction = async (formData) => {
    setLoading(true);
    try {
        const { data } = await axios.post(`/api/login`, formData);
      
        setLoading(false);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("auth_id", data.user.id);
        if(data.user.id === 8){
          navigate("/main/Acceuil");
        } else {
          navigate("/mainCustomer/themeDetail");
        }
        return;
    } catch (error) {
        const { response } = error;
        console.log(response);
        if (response && response.status === 422) {
            Swal.fire({
                text:response.data.errors,
                icon: "error"
            });
        
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

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_id");
    navigate("/login");
  };
  if (loading) {
    return <LoadingLog/>
}
  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};