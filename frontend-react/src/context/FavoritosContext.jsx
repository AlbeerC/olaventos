import { createContext, useState, useContext } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const cargarFavoritos = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/favoritos`, {
        method: "GET",
        headers,
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      setFavoritos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const agregarFavorito = async (eventoId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/favoritos`, {
        method: "POST",
        headers,
        body: JSON.stringify({ eventoId }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      setFavoritos((prev) => [...prev, data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarFavorito = async (eventoId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/favoritos/${eventoId}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      setFavoritos((prev) => prev.filter((fav) => fav.evento.id !== eventoId));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const estaEnFavorito = (eventoId) => {
    return favoritos.some((favorito) => favorito.evento.id === eventoId);
  };

  const contarEventosProximos = (favoritos = []) => {
    const hoy = new Date();

    return favoritos.filter((fav) => {
      if (!fav?.evento?.fecha) return false;
      const fechaEvento = new Date(fav.evento.fecha);
      return fechaEvento >= hoy;
    }).length;
  };

  const generarNotificaciones = (favoritos = []) => {
    const hoy = new Date();

    return favoritos
      .filter((fav) => {
        const fecha = new Date(fav.evento.fecha);
        const diff = fecha - hoy;
        const dias = diff / (1000 * 60 * 60 * 24);
        return dias > 0 && dias <= 7;
      })
      .map((fav) => ({
        id: fav.id,
        texto: `El evento "${fav.evento.titulo}" es pronto`,
        leida: false,
      }));
  };

  const value = {
    cargarFavoritos,
    agregarFavorito,
    eliminarFavorito,
    estaEnFavorito,
    contarEventosProximos,
    generarNotificaciones,
    favoritos,
    loading,
    error,
  };

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
}

export const useFavoritos = () => useContext(FavoritosContext);
