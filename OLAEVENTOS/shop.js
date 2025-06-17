// Shop-specific JavaScript for Olavarría
const allProducts = [
  {
    id: 1,
    name: "Remera OLAEVENTOS Classic",
    price: 4500,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
    category: "ropa",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Gris"],
    isNew: false,
    isOnSale: true,
  },
  {
    id: 2,
    name: "Gorra Festival 2024 Edición Limitada",
    price: 3200,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
    category: "accesorios",
    sizes: ["Única"],
    colors: ["Negro", "Azul", "Rojo"],
    isNew: true,
    isOnSale: false,
  },
  {
    id: 3,
    name: "Bolso Eco-Friendly",
    price: 2800,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "accesorios",
    sizes: ["Única"],
    colors: ["Natural", "Negro"],
    isNew: false,
    isOnSale: false,
  },
  {
    id: 4,
    name: "Buzo Premium OLAEVENTOS",
    price: 8900,
    originalPrice: 11500,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 203,
    category: "ropa",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Gris", "Azul Marino"],
    isNew: false,
    isOnSale: true,
  },
  {
    id: 5,
    name: "Botella Térmica",
    price: 5200,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 78,
    category: "accesorios",
    sizes: ["500ml"],
    colors: ["Negro", "Blanco", "Rosa"],
    isNew: true,
    isOnSale: false,
  },
  {
    id: 6,
    name: "Mochila Festival Impermeable",
    price: 12500,
    originalPrice: 15800,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 167,
    category: "accesorios",
    sizes: ["25L"],
    colors: ["Negro", "Gris", "Verde"],
    isNew: false,
    isOnSale: true,
  },
]

let filteredProducts = [...allProducts]
let currentPage = 1
const productsPerPage = 8

function showNotification(message) {
  alert(message)
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCountElement = document.getElementById("cartCount")
  if (cartCountElement) {
    cartCountElement.textContent = cart.length
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeShop()
})

function initializeShop() {
  setupShopEventListeners()
  loadShopProducts()
  setupCartModal()
}

function setupShopEventListeners() {
  // Search
  const shopSearchInput = document.getElementById("shopSearchInput")
  if (shopSearchInput) {
    shopSearchInput.addEventListener("input", (e) => {
      filterProducts()
    })
  }

  // Filters
  const categoryFilter = document.getElementById("categoryFilter")
  const priceFilter = document.getElementById("priceFilter")
  const sortFilter = document.getElementById("sortFilter")

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts)
  }
  if (priceFilter) {
    priceFilter.addEventListener("change", filterProducts)
  }
  if (sortFilter) {
    sortFilter.addEventListener("change", filterProducts)
  }

  // Load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreProducts)
  }

  // Newsletter
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("newsletterEmail").value
      if (email) {
        showNotification("¡Suscripción exitosa! Vas a recibir nuestras ofertas.")
        document.getElementById("newsletterEmail").value = ""
      }
    })
  }
}

function filterProducts() {
  const searchTerm = document.getElementById("shopSearchInput")?.value.toLowerCase() || ""
  const categoryFilter = document.getElementById("categoryFilter")?.value || ""
  const priceFilter = document.getElementById("priceFilter")?.value || ""
  const sortFilter = document.getElementById("sortFilter")?.value || "popular"

  // Filter products
  filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm)
    const matchesCategory = !categoryFilter || product.category === categoryFilter

    let matchesPrice = true
    if (priceFilter) {
      const price = product.price
      switch (priceFilter) {
        case "0-5000":
          matchesPrice = price <= 5000
          break
        case "5000-15000":
          matchesPrice = price > 5000 && price <= 15000
          break
        case "15000+":
          matchesPrice = price > 15000
          break
      }
    }

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort products
  switch (sortFilter) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "newest":
      filteredProducts.sort((a, b) => b.isNew - a.isNew)
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    default: // popular
      filteredProducts.sort((a, b) => b.reviews - a.reviews)
  }

  currentPage = 1
  loadShopProducts()
}

function loadShopProducts() {
  const shopProductsGrid = document.getElementById("shopProductsGrid")
  if (!shopProductsGrid) return

  const startIndex = 0
  const endIndex = currentPage * productsPerPage
  const productsToShow = filteredProducts.slice(startIndex, endIndex)

  shopProductsGrid.innerHTML = productsToShow
    .map(
      (product) => `
        <div class="product-card fade-in">
            <div class="product-image" style="position: relative; overflow: hidden;">
                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                     style="width: 100%; height: 16rem; object-fit: cover; transition: transform 0.3s ease;">
                
                <!-- Badges -->
                <div style="position: absolute; top: 0.75rem; left: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${product.isNew ? '<span style="background: #10b981; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">Nuevo</span>' : ""}
                    ${product.isOnSale ? '<span style="background: #ef4444; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">Oferta</span>' : ""}
                </div>

                <!-- Wishlist Button -->
                <button style="position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(255,255,255,0.8); border: none; padding: 0.5rem; border-radius: 0.375rem; cursor: pointer;" 
                        onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart" style="color: #6b7280;"></i>
                </button>

                <!-- Quick Add Button -->
                <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; right: 0.75rem; opacity: 0; transition: opacity 0.3s ease;" 
                     class="quick-add-btn">
                    <button class="btn btn-primary btn-full" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Añadir al Carrito
                    </button>
                </div>
            </div>

            <div class="product-content" style="padding: 1rem;">
                <div style="margin-bottom: 0.5rem;">
                    <span style="background: #f3f4f6; color: #6b7280; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize;">
                        ${product.category}
                    </span>
                </div>

                <h3 style="font-weight: 600; color: #111827; margin-bottom: 0.5rem; line-height: 1.4;">${product.name}</h3>

                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center;">
                        ${[...Array(5)]
                          .map(
                            (_, i) => `
                            <i class="fas fa-star" style="width: 0.75rem; height: 0.75rem; color: ${i < Math.floor(product.rating) ? "#fbbf24" : "#d1d5db"};"></i>
                        `,
                          )
                          .join("")}
                    </div>
                    <span style="font-size: 0.75rem; color: #6b7280; margin-left: 0.5rem;">(${product.reviews})</span>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.125rem; font-weight: 700; color: #9333ea;">$${product.price.toLocaleString("es-AR")}</span>
                        ${product.originalPrice ? `<span style="font-size: 0.875rem; color: #6b7280; text-decoration: line-through;">$${product.originalPrice.toLocaleString("es-AR")}</span>` : ""}
                    </div>
                </div>

                <div style="margin-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                        <span style="font-size: 0.75rem; color: #6b7280;">Talles:</span>
                        <div style="display: flex; gap: 0.25rem;">
                            ${product.sizes
                              .slice(0, 3)
                              .map(
                                (size) => `
                                <span style="background: transparent; color: #6b7280; border: 1px solid #d1d5db; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.75rem;">${size}</span>
                            `,
                              )
                              .join("")}
                            ${product.sizes.length > 3 ? `<span style="font-size: 0.75rem; color: #6b7280;">+${product.sizes.length - 3}</span>` : ""}
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 0.75rem; color: #6b7280;">Colores:</span>
                        <div style="display: flex; gap: 0.25rem;">
                            ${product.colors
                              .slice(0, 3)
                              .map(
                                (color) => `
                                <div style="width: 1rem; height: 1rem; border-radius: 50%; border: 1px solid #d1d5db; background: ${getColorCode(color)};" title="${color}"></div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  // Show/hide load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (loadMoreBtn) {
    if (endIndex >= filteredProducts.length) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = "block"
    }
  }

  // Add hover effects
  setTimeout(() => {
    document.querySelectorAll(".product-card").forEach((card) => {
      const img = card.querySelector("img")
      const quickAddBtn = card.querySelector(".quick-add-btn")

      card.addEventListener("mouseenter", () => {
        if (img) img.style.transform = "scale(1.05)"
        if (quickAddBtn) quickAddBtn.style.opacity = "1"
      })

      card.addEventListener("mouseleave", () => {
        if (img) img.style.transform = "scale(1)"
        if (quickAddBtn) quickAddBtn.style.opacity = "0"
      })
    })
  }, 100)
}

function loadMoreProducts() {
  currentPage++
  loadShopProducts()
}

function getColorCode(colorName) {
  const colorMap = {
    Negro: "#000000",
    Blanco: "#ffffff",
    Gris: "#6b7280",
    Azul: "#3b82f6",
    "Azul Marino": "#1e40af",
    Rojo: "#ef4444",
    Rosa: "#ec4899",
    Verde: "#10b981",
    Natural: "#f5f5dc",
  }
  return colorMap[colorName] || "#d1d5db"
}

function toggleWishlist(productId) {
  console.log("Toggle wishlist for product:", productId)
  showNotification("Producto añadido a favoritos")
}

function setupCartModal() {
  const closeCartModal = document.getElementById("closeCartModal")
  if (closeCartModal) {
    closeCartModal.addEventListener("click", () => {
      document.getElementById("cartModal").classList.remove("active")
    })
  }
}

// Override the addToCart function for shop-specific behavior
function addToCart(productId) {
  const product = allProducts.find((p) => p.id === productId)
  if (!product) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count if function exists
  updateCartCount()

  showNotification(`${product.name} añadido al carrito`)
}
