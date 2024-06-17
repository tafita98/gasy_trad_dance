
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Acceuil from './page/Acceuil';
import "../src/styles/style.css"




function App() {
  return (
    <main >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil/>}></Route>
        
          
          
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
