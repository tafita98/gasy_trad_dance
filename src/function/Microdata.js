
import Swal from 'sweetalert2';
import axios from 'axios';

// fonction pour récuperer toute les utilisateurs
export async function getAllMicrodata(){
try {
    const response = await axios.get("/api/microdatas",{
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
export async function getMicrodata(id_microdata){
    try {
        const response = await axios.get(`/api/microdatas/${id_microdata}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        return response.data.microdata;
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

// fonction modifier donner microdata
export async function modifMicrodata(formData){
 
    try {
        const { data } = await  axios.post("/api/modifierMicrodata", formData, {
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

// fonction modifier donner image microdata
export async function modifMicrodataImage(formData){
 
    try {
        const { data } = await  axios.post("/api/modifierMicrodataImage", formData, {
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
        // navigate("/main/microdata");
    } catch (error) {
        const { response } = error;
        console.log(response);
        if (response && response.status === 422) {
           
            Swal.fire({
                text:response.data.message,
                icon: "error"
            });
            window.history.back();
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

// fonction modifier donner fichier microdata
export async function modifMicrodataFile(formData){
 
    try {
        const { data } = await  axios.post("/api/modifierMicrodataFile", formData, {
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