import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

function MapaDetalle() {
  const posicion = [-36.8925, -60.3228]
  
  const marcadores = [
    { coords: [-36.894050374496665, -60.32247491054502], popup: "Teatro municipal" },
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

export default MapaDetalle