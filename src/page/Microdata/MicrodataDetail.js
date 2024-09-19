import React, { useEffect, useState } from 'react'
import { getMicrodata } from '../../function/Microdata';
import { useParams } from 'react-router-dom';
import Loading from '../../component/Loading';
import { FaArrowLeft } from 'react-icons/fa';

function MicrodataDetail() {
    const [loading, setLoading]= useState(false);
    const [microdata,setMicrodata] = useState([]);
    const {id} = useParams();
    const fetchmicrodata = async ()=>{
        setLoading(true)
        const data = await getMicrodata(id);
        setMicrodata(data);
        setLoading(false)
    }
    useEffect(()=>{
        fetchmicrodata();
        // eslint-disable-next-line 
    },[])
   
    if(loading){
        return <Loading/>
    }
  return (
    <div class="mainContenair">
           
            <h1>Profil Microdata</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroud: '#fff', padding: '10px 15px' }}>
                <div class="cote_gauche" >
                    <img src={`http://localhost:8000/microdata/image/${microdata.image}`} alt="" className="profile" />
                </div>
                <div class="cote_droit" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '5px', border: '1px solid #ccc', height: '100%', width: '600px', background: '#ffff', boxShadow: '0 0 8px rgba(0,0,0,0.3)', borderRadius: '10px' }} >
                    <div class="titre_info" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center', justifyContent: 'center', background: '#425e79', color: '#fff', padding: '5px 7px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                        <h4 style={{ color: '#ffff', textAlign: 'center' }}>Details Informations</h4>
                    </div>
                    <div style={{ padding: "5px 10px " }}>
                        <table style={{ width: "100%" }} >
                            <tr>
                                <td >Titre:</td>
                                <td>{microdata.titre}</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>{microdata.description}</td>
                            </tr>
                            <tr>
                                <td>Date Mise en ligne:</td>
                                <td>12/12/23</td>
                            </tr>
                            <tr>
                                <td>Microdata:</td>
                                <td>{microdata.filename}</td>
                            </tr>
                            <tr>
                                <td>Nombre de telechargement:</td>
                                <td>{microdata.nbreDownload}</td>
                            </tr>
                        </table>
                        <div className="button">
                    <button onClick={() => window.history.back()} className='retour'>  <FaArrowLeft/> Retour</button>
                </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MicrodataDetail
