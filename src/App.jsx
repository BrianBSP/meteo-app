import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import MyNav from "./components/MyNav";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
