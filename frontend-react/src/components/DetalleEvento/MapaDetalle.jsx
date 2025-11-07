function MapaDetalle({ lugar, direccion }) {
  // Construye la búsqueda (combina lugar y dirección)
  const query = [lugar, direccion].filter(Boolean).join(", ")
  const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`

  // Si no hay dirección o lugar, muestra un mensaje en lugar del mapa
  if (!direccion && !lugar) {
    return <p>No hay ubicación disponible para este evento.</p>
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-md mt-4">
      <iframe
        src={url}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}

export default MapaDetalle
