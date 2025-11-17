import { Calendar, Bookmark, Bell, MapPin, Edit2, Trash2, ChevronRight } from 'lucide-react';
import './PanelUsuario.css';
import { useAuth } from '../../context/AuthContext';
import { useFavoritos } from '../../context/FavoritosContext';
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react';
import { Link } from 'react-router'
import { formatearFecha } from '../../utils/formatearFecha'
import ModalDatosUsuario from '../ModalDatosUsuario/ModalDatosUsuario';

function PanelUsuario () {

  const { logout, user } = useAuth()
  const { favoritos, cargarFavoritos, eliminarFavorito, contarEventosProximos, generarNotificaciones } = useFavoritos()
  const [modalDatos, setModalDatos] = useState(false)

  useEffect(() => {
    cargarFavoritos()
  }, [])

  const cerrarSesion = () => {
    logout()
    toast.success("Sesión cerrada")
  }

  const proximos = contarEventosProximos(favoritos)
  const notificaciones = generarNotificaciones(favoritos)

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
                <div className="stat-numero">{favoritos?.length || 0}</div>
                <div className="stat-label">Eventos favoritos</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon bookmark-icon">
                <Bookmark size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-numero">{proximos}</div>
                <div className="stat-label">Eventos próximos</div>
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="columna-derecha">
          <h2 className="seccion-titulo">Eventos guardados</h2>
          
          {/* Lista de eventos */}
          <div className="eventos-lista">
            {(favoritos.length === 0 || !favoritos) && <p>No tienes eventos guardados en favoritos</p>}
            {favoritos.length > 0 && favoritos?.map(fav => (
              <div key={fav.evento.id} className="evento-card">
                <h3 className="evento-titulo">{fav.evento.titulo}</h3>
                
                <div className="evento-detalle">
                  <Calendar size={20} />
                  <span>{formatearFecha(fav.evento.fecha)}</span>
                </div>
                
                <div className="evento-detalle">
                  <MapPin size={20} />
                  <span>{fav.evento.lugar}  ({fav.evento.direccion})</span>
                </div>

                <div className="evento-acciones">
                  <button className="btn-icon btn-eliminar" aria-label="Eliminar evento" onClick={() => eliminarFavorito(fav.evento.id)}>
                    <Trash2 size={20} />
                  </button>
                  <Link to={`/detalle/${fav.evento.id}`} className="btn-mas-info">
                    Más info
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Gestión de cuenta */}
          <div className="cuenta-seccion">
            <button className="btn-cuenta" onClick={() => setModalDatos(true)}>Editar datos personales</button>
            <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

       <ModalDatosUsuario 
        abrir={modalDatos}
        cerrar={() => setModalDatos(false)}
        user={user}
      />
    </div>
  );
};

export default PanelUsuario;