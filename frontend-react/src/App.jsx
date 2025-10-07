import './App.css'
import Header from './components/Header/Header'
import Inicio from './components/Inicio/Inicio'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import CrearEventos from './components/CrearEventos/CrearEventos'
import ListaEventos from './components/ListaEventos/ListaEventos'

function App() {

  return (
    <>
      <Header />
      <Inicio />
      <Login />
      <CrearEventos />
      <ListaEventos />
      <Footer />
    </>
  )
}

export default App
