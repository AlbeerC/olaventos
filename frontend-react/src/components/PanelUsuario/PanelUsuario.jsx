import { Calendar, Bookmark, Bell, MapPin, Edit2, Trash2, ChevronRight } from 'lucide-react';
import './PanelUsuario.css';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify'

function PanelUsuario () {
  // Datos ficticios
  const usuario = {
    nombre: "Usuario",
    eventosAgendados: 2,
    eventosMarcados: 5
  };

  const misEventos = [
    {
      id: 1,
      titulo: "Conferencia tecnológica",
      fecha: "5 de agosto del 2025",
      ubicacion: "Teatro municipal - Rivadavia 2800"
    },
    {
      id: 2,
      titulo: "Festival de música local",
      fecha: "12 de agosto del 2025",
      ubicacion: "Parque Central - Av. Libertador 1500"
    }
  ];

  const notificaciones = [
    {
      id: 1,
      texto: "Nuevo evento en tu categoría favorita",
      leida: false
    },
    {
      id: 2,
      texto: "Recordatorio: Conferencia tecnológica mañana",
      leida: false
    }
  ];

  const { logout, user } = useAuth()

  const cerrarSesion = () => {
    logout()
    toast.success("Sesión cerrada")
  }

  if (!user) {
    return (
      <div className='pagina-bloqueada'>
        <p>Tenés que tener una cuenta para ingresar al panel</p>
      </div>
    )
  }

  return (
    <div className="panel-usuario">
      <div className="panel-container">
        {/* Columna izquierda */}
        <div className="columna-izquierda">
          <h1 className="saludo">Hola, {user.nombre}</h1>
          
          {/* Tarjetas de estadísticas */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon calendar-icon">
                <Calendar size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-numero">{usuario.eventosAgendados}</div>
                <div className="stat-label">Eventos agendados</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon bookmark-icon">
                <Bookmark size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-numero">{usuario.eventosMarcados}</div>
                <div className="stat-label">Marcados "Me interesa"</div>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="notificaciones-seccion">
            <h2 className="seccion-titulo">Notificaciones</h2>
            <div className="notificaciones-lista">
              {notificaciones.map(notif => (
                <div key={notif.id} className="notificacion-item">
                  <div className="notificacion-icon">
                    <Bell size={24} />
                  </div>
                  <span className="notificacion-texto">{notif.texto}</span>
                  <ChevronRight size={20} className="notificacion-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="columna-derecha">
          <h2 className="seccion-titulo">Mis eventos</h2>
          
          {/* Lista de eventos */}
          <div className="eventos-lista">
            {misEventos.map(evento => (
              <div key={evento.id} className="evento-card">
                <h3 className="evento-titulo">{evento.titulo}</h3>
                
                <div className="evento-detalle">
                  <Calendar size={20} />
                  <span>{evento.fecha}</span>
                </div>
                
                <div className="evento-detalle">
                  <MapPin size={20} />
                  <span>{evento.ubicacion}</span>
                </div>

                <div className="evento-acciones">
                  <button className="btn-icon btn-eliminar" aria-label="Eliminar evento">
                    <Trash2 size={20} />
                  </button>
                  <button className="btn-mas-info">Más info</button>
                </div>
              </div>
            ))}
          </div>

          {/* Gestión de cuenta */}
          <div className="cuenta-seccion">
            <button className="btn-cuenta">Editar datos personales</button>
            <button className="btn-cuenta">Cambiar contraseña</button>
            <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelUsuario;