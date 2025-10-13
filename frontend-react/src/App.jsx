import './App.css'
import Header from './components/Header/Header'
import Inicio from './components/Inicio/Inicio'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import CrearEventos from './components/CrearEventos/CrearEventos'
import ListaEventos from './components/ListaEventos/ListaEventos'
import DetalleEvento from './components/DetalleEvento/DetalleEvento'
import PanelCreador from './components/PanelCreador/PanelCreador'

function App() {

  return (
    <>
      <Header />
      <Inicio />
      <Login />
      <CrearEventos />
      <ListaEventos />
      <PanelCreador />
      <Footer />
    </>
  )
}

export default App
