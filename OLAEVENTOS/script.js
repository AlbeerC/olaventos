// Global variables
let currentUser = null
let cart = JSON.parse(localStorage.getItem("cart")) || []
const selectedMapEvent = null
const selectedCity = "all"

// Expanded data for the region with real coordinates
const featuredEvents = [
  {
    id: 1,
    title: "Festival de Rock Nacional 2024",
    date: "15 Dic 2024",
    time: "20:00",
    location: "Estadio Municipal, Olavarría",
    city: "olavarria",
    price: "$8.500",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    category: "Música",
    attendees: 850,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Expo Tecnología y Emprendimiento",
    date: "22 Dic 2024",
    time: "09:00",
    location: "Centro de Convenciones, Olavarría",
    city: "olavarria",
    price: "$3.200",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    category: "Tecnología",
    attendees: 450,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Festival Internacional de Tandil",
    date: "28 Dic 2024",
    time: "19:00",
    location: "Anfiteatro Martín Fierro, Tandil",
    city: "tandil",
    price: "$12.000",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "Música",
    attendees: 2500,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Feria Gastronómica Regional",
    date: "30 Dic 2024",
    time: "12:00",
    location: "Plaza San Martín, Azul",
    city: "azul",
    price: "$1.500",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    category: "Gastronomía",
    attendees: 800,
    rating: 4.7,
  },
  {
    id: 5,
    title: "Festival de Jazz La Plata",
    date: "5 Ene 2025",
    time: "21:00",
    location: "Teatro Argentino, La Plata",
    city: "laplata",
    price: "$15.000",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "Música",
    attendees: 1800,
    rating: 4.8,
  },
  {
    id: 6,
    title: "Expo Arte y Cultura",
    date: "8 Ene 2025",
    time: "10:00",
    location: "Centro Cultural, La Plata",
    city: "laplata",
    price: "$2.500",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "Arte",
    attendees: 1200,
    rating: 4.6,
  },
]

// Map events with real coordinates and categories
const mapEvents = [
  // Olavarría
  {
    id: 1,
    title: "Festival de Rock Nacional",
    location: "Estadio Municipal, Olavarría",
    city: "olavarria",
    date: "15 Dic 2024",
    attendees: 850,
    rating: 4.8,
    category: "music",
  },
  {
    id: 2,
    title: "Expo Tecnología",
    location: "Centro de Convenciones, Olavarría",
    city: "olavarria",
    date: "22 Dic 2024",
    attendees: 450,
    rating: 4.9,
    category: "technology",
  },
  // Tandil
  {
    id: 3,
    title: "Festival Internacional de Tandil",
    location: "Anfiteatro Martín Fierro, Tandil",
    city: "tandil",
    date: "28 Dic 2024",
    attendees: 2500,
    rating: 4.9,
    category: "music",
  },
  {
    id: 4,
    title: "Semana de la Cerveza Artesanal",
    location: "Parque Independencia, Tandil",
    city: "tandil",
    date: "2 Ene 2025",
    attendees: 1200,
    rating: 4.7,
    category: "food",
  },
  // Azul
  {
    id: 5,
    title: "Feria Gastronómica Regional",
    location: "Plaza San Martín, Azul",
    city: "azul",
    date: "30 Dic 2024",
    attendees: 800,
    rating: 4.7,
    category: "food",
  },
  {
    id: 6,
    title: "Maratón de Azul",
    location: "Circuito Urbano, Azul",
    city: "azul",
    date: "10 Ene 2025",
    attendees: 600,
    rating: 4.5,
    category: "sports",
  },
  // La Plata
  {
    id: 7,
    title: "Festival de Jazz La Plata",
    location: "Teatro Argentino, La Plata",
    city: "laplata",
    date: "5 Ene 2025",
    attendees: 1800,
    rating: 4.8,
    category: "music",
  },
  {
    id: 8,
    title: "Expo Arte y Cultura",
    location: "Centro Cultural, La Plata",
    city: "laplata",
    date: "8 Ene 2025",
    attendees: 1200,
    rating: 4.6,
    category: "culture",
  },
  {
    id: 9,
    title: "Feria del Libro Universitario",
    location: "UNLP, La Plata",
    city: "laplata",
    date: "12 Ene 2025",
    attendees: 900,
    rating: 4.4,
    category: "culture",
  },
  // Bolívar
  {
    id: 10,
    title: "Festival Folklórico",
    location: "Plaza Principal, Bolívar",
    city: "bolivar",
    date: "15 Ene 2025",
    attendees: 750,
    rating: 4.6,
    category: "music",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Año Nuevo en la Plaza",
    date: "31 Dic 2024",
    time: "23:00",
    location: "Plaza San Martín, Olavarría",
    city: "olavarria",
    category: "Celebración",
    attendees: 2500,
    price: "Gratis",
    daysLeft: 14,
  },
  {
    id: 2,
    title: "Fiesta de la Cerveza Artesanal",
    date: "2 Ene 2025",
    time: "18:00",
    location: "Parque Independencia, Tandil",
    city: "tandil",
    category: "Gastronomía",
    attendees: 1200,
    price: "$4.500",
    daysLeft: 16,
  },
  {
    id: 3,
    title: "Concierto Sinfónico de Verano",
    date: "5 Ene 2025",
    time: "20:00",
    location: "Teatro Argentino, La Plata",
    city: "laplata",
    category: "Música",
    attendees: 1500,
    price: "$8.000",
    daysLeft: 19,
  },
  {
    id: 4,
    title: "Feria del Libro Regional",
    date: "8 Ene 2025",
    time: "10:00",
    location: "Centro Cultural, Azul",
    city: "azul",
    category: "Cultura",
    attendees: 400,
    price: "Gratis",
    daysLeft: 22,
  },
  {
    id: 5,
    title: "Maratón de Verano",
    date: "12 Ene 2025",
    time: "08:00",
    location: "Costanera, La Plata",
    city: "laplata",
    category: "Deportes",
    attendees: 800,
    price: "$3.500",
    daysLeft: 26,
  },
  {
    id: 6,
    title: "Festival de Cine Independiente",
    date: "15 Ene 2025",
    time: "19:00",
    location: "Cine Atlas, Olavarría",
    city: "olavarria",
    category: "Cine",
    attendees: 150,
    price: "$1.800",
    daysLeft: 29,
  },
]

const products = [
  {
    id: 1,
    name: "Remera OLAEVENTOS Regional",
    price: 4500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Ropa",
  },
  {
    id: 2,
    name: "Gorra Festival Tandil 2024",
    price: 3200,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    category: "Accesorios",
  },
  {
    id: 3,
    name: "Bolso Eco-Friendly La Plata",
    price: 2800,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accesorios",
  },
  {
    id: 4,
    name: "Buzo Premium Regional",
    price: 8900,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Ropa",
  },
]

// City names mapping
const cityNames = {
  olavarria: "Olavarría",
  tandil: "Tandil",
  azul: "Azul",
  laplata: "La Plata",
  bolivar: "Bolívar",
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  loadFeaturedEvents()
  loadUpcomingEvents()
  loadProductsPreview()
  updateCartCount()
  checkAuthStatus()

  // Initialize map events list
  setTimeout(() => {
    if (window.loadMapEventsList) {
      window.loadMapEventsList()
    }
  }, 1000)
}

function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("active")) {
        icon.className = "fas fa-times"
      } else {
        icon.className = "fas fa-bars"
      }
    })
  }

  // Search functionality
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleSearch(e.target.value)
    })
  }

  // Cart button
  const cartBtn = document.getElementById("cartBtn")
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      openCartModal()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

function getFilteredEvents(events) {
  if (selectedCity === "all") {
    return events
  }
  return events.filter((event) => event.city === selectedCity)
}

function loadFeaturedEvents() {
  const eventsGrid = document.getElementById("eventsGrid")
  if (!eventsGrid) return

  const filteredEvents = getFilteredEvents(featuredEvents)

  eventsGrid.innerHTML = filteredEvents
    .map(
      (event) => `
        <div class="event-card fade-in">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
                <div class="event-category">${event.category}</div>
                <div class="event-price">${event.price}</div>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-meta">
                    <div><i class="fas fa-calendar-alt"></i> ${event.date}</div>
                    <div><i class="fas fa-clock"></i> ${event.time}</div>
                </div>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${event.location}
                </div>
                <div class="event-stats">
                    <div class="event-attendees">
                        <i class="fas fa-users"></i>
                        ${event.attendees} asistentes
                    </div>
                    <div class="event-rating">
                        <i class="fas fa-star"></i>
                        ${event.rating}
                    </div>
                </div>
                <button class="btn btn-primary btn-full" onclick="viewEventDetails(${event.id})">
                    Ver Detalles
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function loadUpcomingEvents() {
  const upcomingGrid = document.getElementById("upcomingGrid")
  if (!upcomingGrid) return

  const filteredEvents = getFilteredEvents(upcomingEvents)

  upcomingGrid.innerHTML = filteredEvents
    .map(
      (event) => `
        <div class="upcoming-card fade-in">
            <div class="upcoming-header">
                <div>
                    <h3 class="upcoming-title">${event.title}</h3>
                    <div class="upcoming-category">${event.category}</div>
                </div>
                <div class="days-left">${event.daysLeft} días</div>
            </div>
            <div class="upcoming-details">
                <div class="upcoming-detail">
                    <i class="fas fa-calendar-alt"></i>
                    ${event.date}
                    <i class="fas fa-clock"></i>
                    ${event.time}
                </div>
                <div class="upcoming-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    ${event.location}
                </div>
            </div>
            <div class="upcoming-footer">
                <div class="upcoming-attendees">
                    <i class="fas fa-users"></i>
                    ${event.attendees} interesados
                </div>
                <div class="upcoming-price">${event.price}</div>
            </div>
            <div class="upcoming-actions">
                <button class="btn btn-primary" onclick="getTicket(${event.id})">
                    <i class="fas fa-ticket-alt"></i>
                    Obtener Entrada
                </button>
                <button class="btn btn-outline" onclick="viewEventDetails(${event.id})">
                    Más Info
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function loadProductsPreview() {
  const productsPreview = document.getElementById("productsPreview")
  if (!productsPreview) return

  productsPreview.innerHTML = products
    .map(
      (product) => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toLocaleString("es-AR")}</div>
                <button class="btn btn-outline btn-full" onclick="addToCart(${product.id})">
                    Añadir al Carrito
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function handleSearch(query) {
  if (query.length < 2) return

  console.log("Buscando:", query)
  // Implement search functionality
  // This would typically make an API call to search events
}

function viewEventDetails(eventId) {
  console.log("Viendo detalles del evento:", eventId)
  // Implement event details view
  alert(`Ver detalles del evento ${eventId}`)
}

function getTicket(eventId) {
  console.log("Obteniendo entrada para evento:", eventId)
  // Implement ticket purchase
  alert(`Obtener entrada para evento ${eventId}`)
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  showNotification(`${product.name} añadido al carrito`)
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount")
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

function openCartModal() {
  const cartModal = document.getElementById("cartModal")
  if (cartModal) {
    loadCartItems()
    cartModal.classList.add("active")

    // Close modal when clicking outside
    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        closeCartModal()
      }
    })
  }
}

function closeCartModal() {
  const cartModal = document.getElementById("cartModal")
  if (cartModal) {
    cartModal.classList.remove("active")
  }
}

function loadCartItems() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartItems || !cartTotal) return

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Tu carrito está vacío</p>"
    cartTotal.textContent = "0"
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 0.5rem;">
            <div style="flex: 1; margin-left: 1rem;">
                <h4>${item.name}</h4>
                <p>$${item.price.toLocaleString("es-AR")} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ef4444; cursor: pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `,
    )
    .join("")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = total.toLocaleString("es-AR")
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  loadCartItems()
}

function checkAuthStatus() {
  // Check if user is logged in (from localStorage or session)
  const user = localStorage.getItem("currentUser")
  if (user) {
    currentUser = JSON.parse(user)
    updateAuthUI()
  }
}

function updateAuthUI() {
  const authButtons = document.getElementById("authButtons")
  if (authButtons && currentUser) {
    authButtons.innerHTML = `
            <div class="user-menu">
                <button class="btn btn-ghost">
                    <i class="fas fa-user"></i>
                    ${currentUser.firstName}
                </button>
                <button class="btn btn-outline" onclick="logout()">
                    Cerrar Sesión
                </button>
            </div>
        `
  }
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  location.reload()
}

function showNotification(message) {
  // Create a simple notification
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Add CSS for notification animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .cart-item:last-child {
        border-bottom: none;
    }
    
    .user-menu {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .city-btn:hover {
        background: #f3f4f6 !important;
        border-color: #9ca3af !important;
    }
    
    .city-btn.active:hover {
        background: #7c3aed !important;
        border-color: #7c3aed !important;
    }
`
document.head.appendChild(style)

// Load Google Maps script
document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script")
  script.src = "google-maps.js"
  document.head.appendChild(script)
})
