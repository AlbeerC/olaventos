import { Heart } from "lucide-react";

function CartaEvento({evento}) {
  return (
    <div className="evento-card">
      <Heart />
      <h2>{evento.titulo}</h2>
      <h3>{evento.fecha}</h3>
      <p>{evento.lugar}</p>
      <img src={evento.imagen} />
      <a href="">Ver info</a>
    </div>
  );
}

export default CartaEvento;
