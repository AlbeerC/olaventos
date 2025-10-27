import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header/Header";
import Inicio from "./components/Inicio/Inicio";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import CrearEventos from "./components/CrearEventos/CrearEventos";
import ListaEventos from "./components/ListaEventos/ListaEventos";
import PanelCreador from "./components/PanelCreador/PanelCreador";
import DetalleEvento from "./components/DetalleEvento/DetalleEvento";
import LoginCreador from "./components/LoginCreador/LoginCreador"

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
        <Route path="/detalle/:id" element={<DetalleEvento />} />
        <Route path="/login-creador" element={<LoginCreador />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
