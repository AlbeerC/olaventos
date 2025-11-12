import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Inicio from "./components/Inicio/Inicio";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import CrearEventos from "./components/CrearEventos/CrearEventos";
import ListaEventos from "./components/ListaEventos/ListaEventos";
import PanelCreador from "./components/PanelCreador/PanelCreador";
import DetalleEvento from "./components/DetalleEvento/DetalleEvento";
import LoginCreador from "./components/LoginCreador/LoginCreador"
import PanelUsuario from "./components/PanelUsuario/PanelUsuario";
import PanelAdmin from "./components/PanelAdmin/PanelAdmin";

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-evento" element={<CrearEventos />} />
        <Route path="/eventos" element={<ListaEventos />} />
        <Route path="/panel-creador" element={<PanelCreador />} />
        <Route path="/detalle/:id" element={<DetalleEvento />} />
        <Route path="/login-creador" element={<LoginCreador />} />
        <Route path="/panel-usuario" element={<PanelUsuario /> }/>
        <Route path="/panel-admin" element={<PanelAdmin /> }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
