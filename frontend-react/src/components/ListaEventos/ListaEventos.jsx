import { useEffect, useState } from "react";
import "./ListaEventos.css";
import { Search } from "lucide-react";
import CartaEvento from "../CartaEvento/CartaEvento";
import { useEventos } from "../../context/EventosContext";

function ListaEventos() {
  const [categorias, setCategorias] = useState([]);

  const { eventos, loading, error, cargarEventos } = useEventos()

  const cargarCategorias = async () => {
    try {
      const respuesta = await fetch("/categorias.json");

      if (!respuesta.ok) {
        throw new Error(`HTTP Error: ${respuesta.status}`);
      }

      const resultado = await respuesta.json();
      setCategorias(resultado)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    cargarEventos();
    cargarCategorias();
  }, []);
  

  if (error) return <p>Error: {error}</p>
  if (loading) return <p>Cargando...</p>

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

        <div className="categorias">
          {categorias.map((cat) => (
            <button className="boton-categoria">
              <p class="icono">{cat.icono}</p>
              <p>{cat.nombre}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="lista-eventos">
        {eventos.map((evento) => (
          <CartaEvento evento={evento} key={evento.titulo} />
        ))}
      </div>
    </main>
  );
}

export default ListaEventos;
