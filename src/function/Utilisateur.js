
import Swal from 'sweetalert2';
import axios from 'axios';

// fonction pour récuperer toute les utilisateurs
export async function getAllUser(){
try {
    const response = await axios.get("/api/users",{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    return response.data;
}catch (error) {
    const { response } = error;
    console.log(response);
    if (response && response.status === 422) {
        Swal.fire({
            text:response.data.message,
            icon: "error"
        });
    } 
    else if (response && response.status === 401) {
        Swal.fire({
            text:response.data.message,
            icon: "error"
        });
    }
     else if (response) {
        Swal.fire({
            text:response.data.message,
            icon: "error"
        });
    } else {
        Swal.fire({
            text: "Une erreur s'est produite.",
            icon: "error"
        });
    }
} 
}

// fonction pour récuperer un utilisateur
export async function getUser(id_user){
    try {
        const response = await axios.get(`/api/users/${id_user}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        return response.data.user;
    } catch (error) {
        const {response} = error;
        if(response && response.status === 422){
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        }  else if (response && response.status === 401) {
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        }
         else if (response) {
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        } else {
            Swal.fire({
                text: "Une erreur s'est produite.",
                icon: "error"
            });
        }
    }
}

export async function ModifProfiUser(formData){
    try {
        const { data } = await  axios.post("/api/editUser", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
                   'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });
        Swal.fire({
            icon: "success",
            text: data.message
        });
        window.history.back();
    } catch (error) {
        const { response } = error;
        console.log(response);
        if (response && response.status === 422) {
           
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        } 
        else if (response && response.status === 401) {
         
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        }
         else if (response) {
           ;
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        } else {
            Swal.fire({
                text: "Une erreur s'est produite.",
                icon: "error"
            });
        }
   
    } 
}
export async function ModifProfiUserImage(formData){
    try {
        const { data } = await  axios.post("/api/editUserImage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
                   'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });
        Swal.fire({
            icon: "success",
            text: data.message
        });
        // navigate("/main/microdata");
    } catch (error) {
        const { response } = error;
        console.log(response);
        if (response && response.status === 422) {
           
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        } 
        else if (response && response.status === 401) {
         
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        }
         else if (response) {
           ;
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
        } else {
            Swal.fire({
                text: "Une erreur s'est produite.",
                icon: "error"
            });
        }
   
    } 
}