import "./App.css";
import Header from "./components/Header/Header";
import Inicio from "./components/Inicio/Inicio";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import CrearEventos from "./components/CrearEventos/CrearEventos";
import ListaEventos from "./components/ListaEventos/ListaEventos";
import PanelCreador from "./components/PanelCreador/PanelCreador";
import { BrowserRouter, Routes, Route } from "react-router";
import DetalleEvento from "./components/DetalleEvento/DetalleEvento";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-evento" element={<CrearEventos />} />
        <Route path="/eventos" element={<ListaEventos />} />
        <Route path="/panel-creador" element={<PanelCreador />} />
        <Route path="/detalle-evento" element={<DetalleEvento />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
