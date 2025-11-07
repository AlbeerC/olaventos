import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router'
import { formatearFecha } from "../../utils/formatearFecha";
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify";

function CartaEvento({evento, agregarFavorito, estaEnFavorito}) {

  const { user } = useAuth()


  const mostrarMensaje = () => {
    if (estaEnFavorito(evento.id)) {
      toast.error("El evento ya está en tus favoritos")
    } else {
      toast.success("Evento añadido a tus favoritos")
      agregarFavorito(evento.id)
    }
  }

  return (
    <div className="evento-card">
      {user?.rol !== 'organizer' && 
      <button className="boton-favs" onClick={mostrarMensaje}>
        {estaEnFavorito(evento.id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>}
      <h2>{evento.titulo}</h2>
      <h3>{formatearFecha(evento.fecha)}</h3>
      <p>{evento.lugar}</p>
      <img src={evento.imagen} />
      <Link to={`/detalle/${evento.id}`}>Ver info</Link>
    </div>
  );
}

export default CartaEvento;
