import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

function MapaInicio() {
  const posicion = [-36.8925, -60.3228]
  
  const marcadores = [
    { coords: [-36.894050374496665, -60.32247491054502], popup: "<b>Master Stroke</b><br>Tributo a Queen" },
    { coords: [-36.88946876597194, -60.32544841518231], popup: "<b>Taller de Arte, Música y Manualidades</b><br>para Niños" },
    { coords: [-36.895524416740365, -60.33379363782468], popup: "<b>Torneo Nacional de Selecciones de Básquet</b><br>2025" },
    { coords: [-36.88272894572409, -60.319987834541315], popup: "<b>Tertulia Familiar</b><br>Teatro Independiente" },
    { coords: [-36.891080912915, -60.325664966963394], popup: "<b>Feria Gastronómica</b><br>'Sabores del Mundo'" }
  ]

  return (
    <MapContainer center={posicion} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {marcadores.map((m, i) => (
        <Marker key={i} position={m.coords}>
          <Popup>
            <span dangerouslySetInnerHTML={{ __html: m.popup }} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapaInicio
