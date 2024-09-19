

import '../src/styles/style2.css'
// import '../src/js/script.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import "../src/styles/style.css"

import MainContenair from './component/MainContenair';
import Login from './page/utilisateur/Login';
import Register from './page/utilisateur/Register';
import MotPassOublie from './page/utilisateur/MotPassOublie';
import VerifyCompte from './page/utilisateur/VerifyCompte';
import MotdePasseChanger from './page/utilisateur/MotdePasseChanger';
import VerifyResetPassword from './page/utilisateur/verifyResetPassword';
import PrivateRoute from './privateroot/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import Themecostumer from './page/theme/Themecostumer';
import ThemeCreate from './page/theme/ThemeCreate';
import ThemeListe from './page/theme/ThemeListe';
import ThemeEdit from './page/theme/ThemeEdit';
import DirectionAjout from './page/Direction/DirectionAjout';
import DirectionEditer from './page/Direction/DirectionEditer';
import DirectionListe from './page/Direction/DirectionListe';
import EnqueteAjout from './page/Enquete/EnqueteAjout';
import EnqueteEditer from './page/Enquete/EnqueteEditer';
import EnqueteListe from './page/Enquete/EnqueteListe';
import MicrodataAjout from './page/Microdata/MicrodataAjout';
import MicrodataEditer from './page/Microdata/MicrodataEditer';
import MicrodataListe from './page/Microdata/MicrodataListe';
import Clientcreate from './page/client/Clientcreate';
import ClientProfile from './page/client/ClientProfile';
import ModifierProfile from './page/client/ModifierProfile';
import MainContenairCustomer from './component/MainContenairCustomer';
import ThemeDetail from './page/theme/ThemeDetail';
import DemandeCreate from './page/Demande/DemandeCreate';
import DemandeListeCustomer from './page/Demande/DemandeListeCustomer';
import DemandeListeAdmin from './page/Demande/DemandeListeAdmin';
import DemandeEdit from './page/Demande/DemandeEdit';
import PrivateRouteAdmin from './privateroot/PrivateRouteAdmin';
import DemandeDonwload from './page/Demande/DemandeDonwload';
import DemandeDonwloadListe from './page/Demande/DemandeDonwloadListe';

import MicrodataListeCustomer from './page/Microdata/MicrodataListeCustomer';
import Historique from './page/client/Historique';
import DemandeListeDonwloadAdmin from './page/Demande/DemandeListeDonwloadAdmin';
import VerifiToken from './page/Demande/VerifiToken';
import DonwloadFinally from './page/Demande/DonwloadFinally';
import Donne from './page/Demande/Donne';
import DonneCustomer from './page/Donne/DonneCustomer';
import HistoryAll from './page/client/HistoryAll';
import AllUsers from './page/utilisateur/AllUsers';
import ProfilUser from './page/utilisateur/ProfilUser';
import MicrodataDetail from './page/Microdata/MicrodataDetail';
import ModifProfileUser from './page/utilisateur/ModifProfileUser';
import Notification from './page/Notification/Notification';
import TestModal from './page/client/TestModal';
import AcceuilAdmin from './page/Acceuil/AcceuilAdmin';
import DowloadGraph from './page/Acceuil/DowloadGraph';
import TestSwip from './page/Microdata/TestSwip';
import MicrodataDetailCustomer from './page/Microdata/MicrodataDetailCustomer';
import DemandeDonwloadSansVali from './page/Demande/DemandeDonwloadSansVali';



function App() {
  return (
    <main >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          
            <Route path="/verify/:token" element={<VerifyCompte />} />
            <Route path="/reset-password/:token" element={<VerifyResetPassword />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/example" element={<TestModal />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inscrire" element={<Clientcreate />} />
            <Route path="/motpasseoublie" element={<MotPassOublie />} />
            <Route path="/motpassechanger" element={<MotdePasseChanger />} />
            <Route element={<PrivateRouteAdmin />}>
            <Route path="/main" element={<MainContenair />} >
              <Route path="/main/themeCreate" element={<ThemeCreate />} />
              <Route path="/main/themeListe" element={<ThemeListe />} />
              <Route path="/main/themeEdit/:id" element={<ThemeEdit />} />

              <Route path="/main/directionAjout" element={<DirectionAjout />} />
              <Route path="/main/directionEdit/:id" element={<DirectionEditer />} />
              <Route path="/main/direction" element={<DirectionListe />} />

              <Route path="/main/enqueteAjout" element={<EnqueteAjout />} />
              <Route path="/main/enqueteEdit/:id" element={<EnqueteEditer />} />
              <Route path="/main/enquete" element={<EnqueteListe />} />

              <Route path="/main/microdataAjout" element={<MicrodataAjout />} />
              <Route path="/main/microdataEdit/:id" element={<MicrodataEditer />} />
              <Route path="/main/microdata" element={<MicrodataListe />} />

              <Route path="/main/history" element={<HistoryAll />} />
           
              <Route path="/main/EditerProfile/:id" element={<ModifierProfile/>} />
              <Route path="/main/demandeDonwloadAd" element={<DemandeListeDonwloadAdmin/>} />
              <Route path="/main/demandeA" element={<DemandeListeAdmin/>} />

              <Route path="/main/users" element={<AllUsers/>} />
              <Route path="/main/voirProfil/:id" element={<ProfilUser/>} />
              <Route path="/main/voirMicrodata/:id" element={<MicrodataDetail/>} />
              <Route path="/main/ModifProfileUser/:id" element={<ModifProfileUser/>} />

              <Route path="/main/Notification" element={<Notification/>} />

              <Route path="/main/Acceuil" element={<AcceuilAdmin/>} />
              <Route path="/main/graphe" element={<DowloadGraph/>} />
            </Route>
            </Route>
            <Route element={<PrivateRoute />}>
            
              <Route path="/mainCustomer" element={<MainContenairCustomer />} >
              <Route path="/mainCustomer/EditerProfile/:id" element={<ModifierProfile/>} />
              <Route path="/mainCustomer/voirProfile/:id" element={<ClientProfile/>} />
              <Route path="/mainCustomer/poursuivredemande/:token" element={<VerifiToken />} />
                <Route exact path='/mainCustomer/theme' element={<Themecostumer />} />
                <Route path="/mainCustomer/themeDetail" element={<ThemeDetail />} />
                <Route path="/mainCustomer/demandeCreate" element={<DemandeCreate/>} />
                <Route path="/mainCustomer/donneListe/:themes_name" element={<MicrodataListeCustomer/>} />
                <Route path="/mainCustomer/demande" element={<DemandeListeCustomer/>} />
                <Route path="/mainCustomer/demandeEditer/:id" element={<DemandeEdit/>} />
                <Route path="/mainCustomer/demandeDonwload/:id" element={<DemandeDonwload/>} />
                <Route path="/mainCustomer/demandeDonwloadSanValidation/:id" element={<DemandeDonwloadSansVali/>} />
                <Route path="/mainCustomer/demandeDonwload" element={<DemandeDonwloadListe/>} />
                <Route path="/mainCustomer/historique" element={<Historique/>} />
                <Route path="/mainCustomer/donwloadFinally/:id_p" element={<DonwloadFinally/>} />
                <Route path="/mainCustomer/donne" element={<Donne/>} />
                <Route path="/mainCustomer/testSwap" element={<TestSwip/>} />
                <Route path="/mainCustomer/donneCustomer" element={<DonneCustomer/>} />
                <Route path="/mainCustomer/voirMicrodataC/:id" element={<MicrodataDetailCustomer/>} />
                
            </Route>
            </Route>



          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
