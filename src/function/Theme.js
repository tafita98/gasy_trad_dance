import Swal from 'sweetalert2';
import axios from 'axios';

export async function getAlltheme(){
   try {
    const response = await axios.get('/api/themes',
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });
      return response.data;
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
export async function modifTheme(formData){
    try {
        const { data } = await axios.post(`/api/modifierTheme`,formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });

      
      
        Swal.fire({
            icon: "success",
            text: data.message
        });
        window.history.back();
        // navigate("/main/themeListe");
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
export async function modifThemeImage(formData){
 
    try {
        const { data } = await  axios.post("/api/modifierThemeImage", formData, {
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
