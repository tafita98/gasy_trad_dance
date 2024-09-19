
import Swal from 'sweetalert2';

import axios from 'axios';

export async function creerStory(microdatas_id, users_id){
    const formData = new FormData();
    formData.append('microdatas_id', microdatas_id);
    formData.append('users_id', users_id);
    try {
       await axios.post("api/createHistory",formData,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
       })
    }  catch (error) {
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
  // fonction pour récuperer toutes les historiques
  export async function AllHistory(){
    try {
        const response = await axios.get("/api/AllHistory", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });
      return response.data;

    }  catch (error) {
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
    