import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./components/MyNav";
import MainSection from "./components/MainSection";
import Dettagli from "./components/Dettagli";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/detail/:citta" element={<Dettagli />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
