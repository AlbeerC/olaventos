// Google Maps Integration for OLAEVENTOS
let map
let markers = []
let infoWindow
let markerCluster
let selectedCity = "all" // Declare selectedCity variable
const mapEvents = [] // Declare mapEvents variable
let selectedMapEvent = null // Declare selectedMapEvent variable

// Real coordinates for Argentine cities
const cityCoordinates = {
  olavarria: { lat: -36.8927, lng: -60.3225 },
  tandil: { lat: -37.3217, lng: -59.1332 },
  azul: { lat: -36.777, lng: -59.8581 },
  laplata: { lat: -34.9214, lng: -57.9544 },
  bolivar: { lat: -36.2354, lng: -61.1198 },
}

// Custom marker icons for different event categories
const markerIcons = {
  music: {
    url:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#9333ea" stroke="white" stroke-width="2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16">🎵</text>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40),
  },
  culture: {
    url:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16">🎭</text>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40),
  },
  food: {
    url:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#f97316" stroke="white" stroke-width="2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16">🍽️</text>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40),
  },
  sports: {
    url:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#10b981" stroke="white" stroke-width="2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16">⚽</text>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40),
  },
  technology: {
    url:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#6366f1" stroke="white" stroke-width="2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16">💻</text>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40),
  },
}

// Initialize Google Maps
function initMap() {
  // Hide loading state
  document.getElementById("mapLoading").style.display = "none"

  // Center map on the region (between all cities)
  const centerLat = -36.0
  const centerLng = -59.0

  map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 8,
    center: { lat: centerLat, lng: centerLng },
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
  })

  // Initialize InfoWindow
  infoWindow = new google.maps.InfoWindow()

  // Load initial markers
  loadMapMarkers()

  // Setup city filter listeners
  setupMapCityFilters()
}

function loadMapMarkers() {
  // Clear existing markers
  clearMarkers()

  // Get filtered events based on selected city
  const filteredEvents = getFilteredMapEvents()

  // Create markers for each event
  filteredEvents.forEach((event) => {
    createEventMarker(event)
  })

  // Adjust map bounds to show all markers
  if (markers.length > 0) {
    const bounds = new google.maps.LatLngBounds()
    markers.forEach((marker) => {
      bounds.extend(marker.getPosition())
    })

    if (markers.length === 1) {
      map.setCenter(markers[0].getPosition())
      map.setZoom(12)
    } else {
      map.fitBounds(bounds)
      map.setZoom(Math.min(map.getZoom(), 10))
    }
  }
}

function createEventMarker(event) {
  const cityCoord = cityCoordinates[event.city]
  if (!cityCoord) return

  // Add small random offset to avoid overlapping markers in same city
  const lat = cityCoord.lat + (Math.random() - 0.5) * 0.01
  const lng = cityCoord.lng + (Math.random() - 0.5) * 0.01

  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: event.title,
    icon: markerIcons[event.category] || markerIcons.music,
    animation: google.maps.Animation.DROP,
  })

  // Create info window content
  const infoContent = createInfoWindowContent(event)

  // Add click listener
  marker.addListener("click", () => {
    infoWindow.setContent(infoContent)
    infoWindow.open(map, marker)

    // Highlight corresponding event in sidebar
    highlightMapEvent(event.id)
  })

  // Store event data with marker
  marker.eventData = event
  markers.push(marker)
}

function createInfoWindowContent(event) {
  return `
    <div style="max-width: 300px; padding: 1rem;">
      <h3 style="margin: 0 0 0.5rem 0; color: #111827; font-size: 1.125rem; font-weight: 600;">
        ${event.title}
      </h3>
      
      <div style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #6b7280; font-size: 0.875rem;">
        <i class="fas fa-map-marker-alt" style="margin-right: 0.5rem; color: #9333ea;"></i>
        ${event.location}
      </div>
      
      <div style="display: flex; align-items: center; margin-bottom: 0.5rem; color: #6b7280; font-size: 0.875rem;">
        <i class="fas fa-calendar-alt" style="margin-right: 0.5rem; color: #9333ea;"></i>
        ${event.date}
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; color: #6b7280; font-size: 0.875rem;">
          <i class="fas fa-users" style="margin-right: 0.25rem;"></i>
          ${event.attendees}
        </div>
        <div style="display: flex; align-items: center; color: #6b7280; font-size: 0.875rem;">
          <i class="fas fa-star" style="margin-right: 0.25rem; color: #fbbf24;"></i>
          ${event.rating}
        </div>
      </div>
      
      <div style="display: flex; gap: 0.5rem;">
        <button onclick="viewEventDetails(${event.id})" 
                style="flex: 1; background: #9333ea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; cursor: pointer;">
          Ver Detalles
        </button>
        <button onclick="getDirections('${event.city}')" 
                style="background: #f3f4f6; color: #6b7280; border: none; padding: 0.5rem; border-radius: 0.375rem; cursor: pointer;">
          <i class="fas fa-directions"></i>
        </button>
      </div>
    </div>
  `
}

function clearMarkers() {
  markers.forEach((marker) => {
    marker.setMap(null)
  })
  markers = []
}

function getFilteredMapEvents() {
  if (selectedCity === "all") {
    return mapEvents
  }
  return mapEvents.filter((event) => event.city === selectedCity)
}

function setupMapCityFilters() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("city-btn")) {
      const city = e.target.dataset.city
      selectCityOnMap(city)
    }
  })
}

function selectCityOnMap(city) {
  selectedCity = city

  // Update button states
  document.querySelectorAll(".city-btn").forEach((btn) => {
    if (btn.dataset.city === city) {
      btn.style.background = "#9333ea"
      btn.style.color = "white"
      btn.style.borderColor = "#9333ea"
      btn.classList.add("active")
    } else {
      btn.style.background = "white"
      btn.style.color = "#6b7280"
      btn.style.borderColor = "#d1d5db"
      btn.classList.remove("active")
    }
  })

  // Reload map markers
  loadMapMarkers()

  // Update sidebar events
  loadMapEventsList()

  // Center map on selected city
  if (city !== "all" && cityCoordinates[city]) {
    map.setCenter(cityCoordinates[city])
    map.setZoom(12)
  }
}

function loadMapEventsList() {
  const mapEventsContainer = document.getElementById("mapEvents")
  if (!mapEventsContainer) return

  const filteredEvents = getFilteredMapEvents()

  mapEventsContainer.innerHTML = filteredEvents
    .map(
      (event) => `
      <div class="map-event-card ${selectedMapEvent === event.id ? "active" : ""}" 
           onclick="selectMapEventFromList(${event.id})" 
           data-event-id="${event.id}">
          <div class="map-event-title">${event.title}</div>
          <div class="map-event-meta">
              <i class="fas fa-map-marker-alt"></i> ${event.location} • 
              <i class="fas fa-calendar-alt"></i> ${event.date}
          </div>
          <div class="map-event-stats">
              <div><i class="fas fa-users"></i> ${event.attendees}</div>
              <div><i class="fas fa-star"></i> ${event.rating}</div>
          </div>
      </div>
    `,
    )
    .join("")
}

function selectMapEventFromList(eventId) {
  selectedMapEvent = selectedMapEvent === eventId ? null : eventId

  // Update active states in sidebar
  document.querySelectorAll(".map-event-card").forEach((card) => {
    card.classList.remove("active")
  })

  if (selectedMapEvent) {
    const activeCard = document.querySelector(`[data-event-id="${eventId}"]`)
    if (activeCard) {
      activeCard.classList.add("active")
    }

    // Find and trigger marker click
    const marker = markers.find((m) => m.eventData.id === eventId)
    if (marker) {
      google.maps.event.trigger(marker, "click")
      map.setCenter(marker.getPosition())
      map.setZoom(Math.max(map.getZoom(), 12))
    }
  } else {
    infoWindow.close()
  }
}

function highlightMapEvent(eventId) {
  // Update sidebar selection
  selectedMapEvent = eventId

  document.querySelectorAll(".map-event-card").forEach((card) => {
    card.classList.remove("active")
  })

  const activeCard = document.querySelector(`[data-event-id="${eventId}"]`)
  if (activeCard) {
    activeCard.classList.add("active")
    activeCard.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

function getDirections(cityKey) {
  const cityCoord = cityCoordinates[cityKey]
  if (!cityCoord) return

  const url = `https://www.google.com/maps/dir/?api=1&destination=${cityCoord.lat},${cityCoord.lng}`
  window.open(url, "_blank")
}

// Fallback if Google Maps fails to load
window.addEventListener("load", () => {
  setTimeout(() => {
    if (!window.google) {
      document.getElementById("mapLoading").innerHTML = `
        <div style="text-align: center; color: #ef4444;">
          <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
          <p>Error al cargar Google Maps</p>
          <p style="font-size: 0.875rem; color: #6b7280;">Verifica tu conexión a internet</p>
        </div>
      `
    }
  }, 5000)
})

// Export functions for global access
window.initMap = initMap
window.getDirections = getDirections
