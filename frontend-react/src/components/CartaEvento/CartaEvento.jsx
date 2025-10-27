import { Heart } from "lucide-react";
import { Link } from 'react-router'
import { formatearFecha } from "../../utils/formatearFecha";

function CartaEvento({evento}) {
  return (
    <div className="evento-card">
      <Heart />
      <h2>{evento.titulo}</h2>
      <h3>{formatearFecha(evento.fecha)}</h3>
      <p>{evento.lugar}</p>
      <img src={evento.imagen} />
      <Link to={`/detalle/${evento.id}`}>Ver info</Link>
    </div>
  );
}

export default CartaEvento;
