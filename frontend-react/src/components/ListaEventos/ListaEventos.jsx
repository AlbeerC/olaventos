import { use, useEffect, useState } from "react";
import "./ListaEventos.css";
import { Search } from "lucide-react";
import CartaEvento from "../CartaEvento/CartaEvento";

function ListaEventos() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const respuesta = await fetch("/eventos.json");

        if (!respuesta.ok) {
          throw new Error(`HTTP Error: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        setEventos(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    cargarEventos();
  }, []);

  return (
    <main className="eventos-main">
      <div className="titles">
        <h2>Todos los eventos</h2>
        <h3>Descubrí lo que está pasando en Olavarría</h3>
      </div>
      <div className="busqueda-eventos">
        <div className="barra-busqueda">
          <Search />
          <input type="search" placeholder="Buscar eventos..." />
        </div>

        <div className="categorias" id="categorias"></div>
      </div>
        <div className="lista-eventos">
            {eventos.map((evento) => (
            <CartaEvento evento={evento} key={evento.titulo}/>
        ))}
        </div>
    </main>
  );
}

export default ListaEventos;
