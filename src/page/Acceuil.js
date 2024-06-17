import React, { useState } from 'react'
import kaosa from '../Saved Pictures/danse/kaosa.PNG';
import batrelaky from '../Saved Pictures/danse/batrelaky.PNG';
import afindrafindrao from '../Saved Pictures/danse/afindrafindrao.PNG';
import Karitaka from '../Saved Pictures/danse/karitaka.PNG';
import kidod from '../Saved Pictures/danse/kidod.PNG';
import tsapiky from '../Saved Pictures/danse/tsapiky.PNG';
import kilalaky from '../Saved Pictures/danse/kilalaky.PNG';
import kininiky from '../Saved Pictures/danse/kininiky.PNG';
import mangaliba from '../Saved Pictures/danse/mangaliba.PNG';
import kawitry from '../Saved Pictures/danse/kawitry.PNG';
import tsipelatanana from '../Saved Pictures/danse/tsipelatanana.PNG';
import salegy from '../Saved Pictures/danse/malesa.PNG';
// import feuart from '../Saved Pictures/danse/feux d\'artifice.PNG';

function Acceuil() {
    const dihys = [
        { nom: "kaosa", foko: "Antesaka", image:"kaosa.PNG" },
        { nom: "Batrelaky", foko: "Antesaka", image:"batrelaky.PNG" },
        { nom: "Batrelaky", foko: "Antemoro", image:"batrelaky.PNG" },
        { nom: "Batrelaky", foko: "Antefasy", image:"batrelaky.PNG" },
        { nom: "Afindrafindrao", foko: "Merina", image:"afindrafindrao.PNG" },
        { nom: "Karitaka", foko: "Bara", image:"Karitaka.PNG" },
        { nom: "Kidodo", foko: "Betsileo", image:"kidod.PNG" },
        { nom: "Tsapiky", foko: "vezo", image:"tsapiky.PNG" },
        { nom: "Mangaliba", foko: "Antanosy", image:"mangaliba.PNG" },
        { nom: "kilalaky", foko: "Sakalava", image:"kilalaky.PNG" },
        { nom: "Kawitry", foko: "Tsimihety", image:"kawitry.PNG" },
        { nom: "Salegy", foko: "Tavaratra", image:"malesa.PNG" },
        { nom: "Tsipelatanana", foko: "Merina", image:"tsipelatanana.PNG" },
        { nom: "Kininiky", foko: "Atsimo", image:"kininiky.PNG" }
    ];

    const imageMap = {
        "kaosa.PNG":kaosa,
        "batrelaky.PNG":batrelaky,
        "afindrafindrao.PNG": afindrafindrao,
        "Karitaka.PNG": Karitaka,
        "kidod.PNG": kidod,
        "tsapiky.PNG": tsapiky,
        "kilalaky.PNG": kilalaky,
        "kininiky.PNG": kininiky,
        "mangaliba.PNG":mangaliba,
        "malesa.PNG":salegy,
        "tsipelatanana.PNG":tsipelatanana,
        "kawitry.PNG":kawitry,
    };

    const [filtre, setFiltre] = useState('');

    const handleChangeFiltre = (e) => {
        setFiltre(e.target.value);
    };

    let dihysFiltres = dihys;
    if (filtre.trim() !== '') {
        dihysFiltres = dihys.filter((dihy) => {
            return dihy.foko.toLowerCase().includes(filtre.toLowerCase());
        });
    }

    return (
        <div className='contenair'>
                <div className='imag'></div>
            <h1>Gasy  <span className='trad'>Traditionnel</span> <span className='dance'>Dance</span> </h1>
            <input
                type="text"
                value={filtre}
                onChange={handleChangeFiltre}
                placeholder="Chercher nom..."
                className='liste-input-container'
            />
            <div className='dihy_liste'>
                {dihysFiltres.map((dihy, index) => (
                    <div key={index} className='dihy'>
                        <div className='info'>
                        <h4>{dihy.nom}</h4>
                        <span>{dihy.foko}</span>
                        </div>
                        <div className='box-image'>
                        <img  src={imageMap[dihy.image]} alt={dihy.nom} />
                        </div>
                    </div>
                ))}
            </div>
            <div className='auteur'>
            <p> @Tafitaprospere</p>
                </div>
        </div>
    );
}

export default Acceuil;
