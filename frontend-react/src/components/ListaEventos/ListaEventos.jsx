import { useEffect, useState } from "react";
import "./ListaEventos.css";
import { Search } from "lucide-react";
import CartaEvento from "../CartaEvento/CartaEvento";
import { useEventos } from "../../context/EventosContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function ListaEventos() {
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [eventosFiltrados, setEventosFiltrados] = useState([]);

  const { eventos, loading, error, cargarEventos } = useEventos();
  const { user } = useAuth();

  const cargarCategorias = async () => {
    try {
      const respuesta = await fetch("/categorias.json");

      if (!respuesta.ok) {
        throw new Error(`HTTP Error: ${respuesta.status}`);
      }

      const resultado = await respuesta.json();
      setCategorias(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarFavorito = () => {
    if (!user) {
      toast.error("Inicia sesión para agregar favoritos");
      return;
    }
  };

  useEffect(() => {
    cargarEventos();
    cargarCategorias();
  }, []);

  useEffect(() => {
    const term = busqueda.toLowerCase();

    const filtrados = eventos.filter(
      (e) =>
        e.titulo.toLowerCase().includes(term) ||
        e.categoria.toLowerCase().includes(term) ||
        e.lugar.toLowerCase().includes(term)
    );

    setEventosFiltrados(filtrados);
  }, [busqueda, eventos]);

  const filtrarPorCategoria = (categoria) => {
    if (categoria === 'Todos') return setEventosFiltrados(eventos)

    const filtrados = eventos.filter(
      (e) => e.categoria.split(' ')[1] === categoria
    )

    setEventosFiltrados(filtrados);
  }

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Cargando...</p>;

  return (
    <main className="eventos-main">
      <div className="titles">
        <h2>Todos los eventos</h2>
        <h3>Descubrí lo que está pasando en Olavarría</h3>
      </div>
      <div className="busqueda-eventos">
        <div className="barra-busqueda">
          <Search />
          <input
            type="search"
            placeholder="Buscar eventos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="categorias">
          {categorias.map((cat) => (
            <button className="boton-categoria" onClick={() => filtrarPorCategoria(cat.nombre)}>
              <p class="icono">{cat.icono}</p>
              <p>{cat.nombre}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="lista-eventos">
        {eventosFiltrados.map((evento) => (
          <CartaEvento
            evento={evento}
            key={evento.titulo}
            agregarFavorito={agregarFavorito}
          />
        ))}
      </div>
    </main>
  );
}

export default ListaEventos;
