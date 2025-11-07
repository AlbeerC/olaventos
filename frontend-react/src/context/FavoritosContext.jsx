import { createContext, useState, useContext } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
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
      const res = await fetch("http://localhost:3000/favoritos", {
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
      const res = await fetch("http://localhost:3000/favoritos", {
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
      const res = await fetch(`http://localhost:3000/favoritos/${eventoId}`, {
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

  const value = {
    cargarFavoritos,
    agregarFavorito,
    eliminarFavorito,
    estaEnFavorito,
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
