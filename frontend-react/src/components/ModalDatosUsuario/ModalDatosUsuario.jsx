import { useState } from "react";
import "./ModalDatosUsuario.css";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function ModalDatosUsuario({ abrir, cerrar, user }) {
  const [datosForm, setDatosForm] = useState({
    nombre: user?.nombre || "",
    descripcion: user?.descripcion || "",
    passwordActual: "",
    passwordNueva: "",
    confirmarPassword: "",
  });

  const { setUser } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setDatosForm({
      ...datosForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No estás autenticado");
        return;
      }

      // --- 1) Actualizar datos personales ---
      const datosActualizados = {};

      if (datosForm.nombre !== user.nombre) {
        datosActualizados.nombre = datosForm.nombre;
      }
      if (datosForm.descripcion !== user.descripcion) {
        datosActualizados.descripcion = datosForm.descripcion;
      }

      let updatedUser = user; // valor por defecto por si no actualizó nada

      if (Object.keys(datosActualizados).length > 0) {
        const res = await fetch(`${API_URL}/usuarios/me`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(datosActualizados),
        });

        if (!res.ok) throw new Error("Error al actualizar perfil");

        updatedUser = await res.json(); // ←🔥 ACA ESTABA TU ERROR
      }

      // --- 2) Cambiar contraseña ---
      if (
        datosForm.passwordActual ||
        datosForm.passwordNueva ||
        datosForm.confirmarPassword
      ) {
        if (datosForm.passwordNueva !== datosForm.confirmarPassword) {
          toast.error("Las contraseñas nuevas no coinciden");
          return;
        }

        const resPass = await fetch(`${API_URL}/usuarios/me/password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            actual: datosForm.passwordActual,
            nueva: datosForm.passwordNueva,
          }),
        });

        if (!resPass.ok) {
          const err = await resPass.json();
          toast.error(err.message || "Error al cambiar contraseña");
          return;
        }
      }

      toast.success("Datos actualizados correctamente");

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      cerrar();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error actualizando tus datos");
    }
  };

  if (!abrir) return null;

  return (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Perfil</h2>
          <button className="close-btn" onClick={cerrar}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="form-section">
            <h3>Información Personal</h3>

            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={datosForm.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
              />
            </div>

            {user?.rol === "organizer" && (
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={datosForm.descripcion}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre ti..."
                  rows="3"
                />
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Cambiar Contraseña</h3>

            <div className="form-group">
              <label>Contraseña Actual</label>
              <input
                type="password"
                name="passwordActual"
                value={datosForm.passwordActual}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label>Nueva Contraseña</label>
              <input
                type="password"
                name="passwordNueva"
                value={datosForm.passwordNueva}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmarPassword"
                value={datosForm.confirmarPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={cerrar}>
            Cancelar
          </button>
          <button type="button" className="btn-save" onClick={handleSubmit}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDatosUsuario;
