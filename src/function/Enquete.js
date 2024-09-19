import Swal from 'sweetalert2';
import axios from 'axios';

export async function getAllEnquete(){
   try {
    const response = await axios.get('/api/enquetes',
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