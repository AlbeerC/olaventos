import "./PanelCreador.css";
import { formatearFecha } from "../../utils/formatearFecha"
import { useEffect, useState } from "react";
import PanelCreadorCarta from "../PanelCreadorCarta/PanelCreadorCarta"
import { Plus } from "lucide-react";

function PanelCreador() {

    const [eventos, setEventos] = useState([])

    useEffect(() => {
        const cargarEventosCreador = async () => {
            try {
            const respuesta = await fetch('/eventos.json')

            if (!respuesta.ok) {
                throw new Error(`HTTP Error: ${respuesta.status}`)
            }

            const resultado = await respuesta.json()
            setEventos(resultado.slice(0, 3))
            } catch (error) {
                console.log(error.message)
            }
        }

        cargarEventosCreador()
    }, [])

  return (
    <main className="panel-creador-main">
      <section className="titulos">
        <h2>Mis eventos</h2>
        <a href="./crearEvento.html">
          <button>
            <Plus /> 
            <span>Nuevo evento</span>
          </button>
        </a>
      </section>

      <section className="eventos-creador">
        {eventos.map((evento) => (
            <PanelCreadorCarta evento={evento} key={evento.titulo}/>
        ))}

      </section>
    </main>
  );
}

export default PanelCreador;
