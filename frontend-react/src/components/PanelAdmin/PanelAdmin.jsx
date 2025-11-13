import "./PanelAdmin.css"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import ModalConfirmacion from "../ModalConfirmacion/ModalConfirmacion"

function PanelAdmin() {
  const API_URL = import.meta.env.VITE_API_URL

  const { user, logout } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false)
  const [modalAprobarAbierto, setModalAprobarAbierto] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
    const cargarOrganizadores = async () => {
      try {
        setLoading(true)
        const respuesta = await fetch(`${API_URL}/usuarios/organizadores`)

        if (!respuesta.ok) throw new Error(`HTTP error: ${respuesta.status}`)

        const resultado = await respuesta.json()
        setUsuarios(resultado)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    cargarOrganizadores()
  }, [])

  const aprobarUsuario = async (userId) => {
    try {
      const respuesta = await fetch(`${APU_URL}/usuarios/${userId}/approve`, {
        method: "PATCH",
      })

      if (!respuesta.ok) throw new Error(`HTTP error: ${respuesta.status}`)

      const resultado = await respuesta.json()
      setUsuarios((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, aprobado: true } : user))
      )
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarUsuario = async (userId) => {
    try {
      const respuesta = await fetch(`${API_URL}/usuarios/${userId}`, {
        method: "DELETE",
      })

      if (!respuesta.ok) throw new Error(`HTTP error: ${respuesta.status}`)

      setUsuarios((prev) => prev.filter((user) => user.id !== userId))
    } catch (error) {
      console.log(error)
    }
  }

  // --- ELIMINAR ---
  const handleEliminarClick = (id) => {
    setSelectedUserId(id)
    setModalEliminarAbierto(true)
  }

  const confirmarEliminar = () => {
    if (selectedUserId) eliminarUsuario(selectedUserId)
    setModalEliminarAbierto(false)
    setSelectedUserId(null)
  }

  const cancelarEliminar = () => {
    setModalEliminarAbierto(false)
    setSelectedUserId(null)
  }

  // --- APROBAR ---
  const handleAprobarClick = (id) => {
    setSelectedUserId(id)
    setModalAprobarAbierto(true)
  }

  const confirmarAprobar = () => {
    if (selectedUserId) aprobarUsuario(selectedUserId)
    setModalAprobarAbierto(false)
    setSelectedUserId(null)
  }

  const cancelarAprobar = () => {
    setModalAprobarAbierto(false)
    setSelectedUserId(null)
  }

  if (!user || user.rol !== "admin") {
    return (
      <div className="pagina-bloqueada">
        <p>No tenés permisos para acceder a este panel</p>
      </div>
    )
  }

  return (
    <div className="users-table-container">
      <div className="users-table-header">
        <h2>Gestión de Usuarios</h2>
        <span className="users-count">{usuarios.length} usuarios</span>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td data-label="Nombre">{user.nombre}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Descripción" className="description-cell">
                  {user.descripcion}
                </td>
                <td data-label="Estado">
                  <span
                    className={`status-badge ${
                      user.aprobado ? "approved" : "pending"
                    }`}
                  >
                    {user.aprobado ? "Aprobado" : "Pendiente"}
                  </span>
                </td>
                <td data-label="Acciones">
                  <div className="actions-cell">
                    <button
                      className="action-btn approve-btn"
                      onClick={() => handleAprobarClick(user.id)}
                      title="Aprobar"
                      disabled={user.aprobado}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleEliminarClick(user.id)}
                      title="Eliminar"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalConfirmacion
        isOpen={modalEliminarAbierto}
        message="¿Estás seguro que quieres eliminar este usuario?"
        onConfirm={confirmarEliminar}
        onCancel={cancelarEliminar}
      />

      <ModalConfirmacion
        isOpen={modalAprobarAbierto}
        message="¿Estás seguro que quieres aprobar este usuario?"
        onConfirm={confirmarAprobar}
        onCancel={cancelarAprobar}
      />

      <button className="btn-cerrar-sesion" onClick={logout}>Cerrar sesión</button>
    </div>
  )
}

export default PanelAdmin
