import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Heart, Filter, Search } from "lucide-react"
import Header from "@/components/header"

export default function MerchandisingPage() {
  const products = [
    {
      id: 1,
      name: "Camiseta OLAEVENTOS Classic",
      price: 19.99,
      originalPrice: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 124,
      category: "Ropa",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Negro", "Blanco", "Gris"],
      isNew: false,
      isOnSale: true,
    },
    {
      id: 2,
      name: "Gorra Festival 2024 Edición Limitada",
      price: 16.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 89,
      category: "Accesorios",
      sizes: ["Única"],
      colors: ["Negro", "Azul", "Rojo"],
      isNew: true,
      isOnSale: false,
    },
    {
      id: 3,
      name: "Tote Bag Eco-Friendly",
      price: 12.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 156,
      category: "Accesorios",
      sizes: ["Única"],
      colors: ["Natural", "Negro"],
      isNew: false,
      isOnSale: false,
    },
    {
      id: 4,
      name: "Sudadera Premium OLAEVENTOS",
      price: 29.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 203,
      category: "Ropa",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Negro", "Gris", "Azul Marino"],
      isNew: false,
      isOnSale: true,
    },
    {
      id: 5,
      name: "Botella de Agua Térmica",
      price: 22.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 78,
      category: "Accesorios",
      sizes: ["500ml"],
      colors: ["Negro", "Blanco", "Rosa"],
      isNew: true,
      isOnSale: false,
    },
    {
      id: 6,
      name: "Mochila Festival Impermeable",
      price: 34.99,
      originalPrice: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 167,
      category: "Accesorios",
      sizes: ["25L"],
      colors: ["Negro", "Gris", "Verde"],
      isNew: false,
      isOnSale: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tienda Oficial OLAEVENTOS</h1>
            <p className="text-xl opacity-90 mb-8">
              Lleva contigo el espíritu de los mejores eventos con nuestro merchandising exclusivo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-yellow-400 text-yellow-900 px-4 py-2 text-lg">🎉 Envío gratis en pedidos +€30</Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-lg">⚡ Entrega en 24-48h</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar productos..." className="pl-10" />
              </div>

              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="ropa">Ropa</SelectItem>
                    <SelectItem value="accesorios">Accesorios</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Precio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="0-20">€0 - €20</SelectItem>
                    <SelectItem value="20-40">€20 - €40</SelectItem>
                    <SelectItem value="40+">€40+</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Más populares" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Más populares</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                  <SelectItem value="newest">Más nuevos</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-green-500 text-white">Nuevo</Badge>}
                    {product.isOnSale && <Badge className="bg-red-500 text-white">Oferta</Badge>}
                  </div>

                  {/* Wishlist Button */}
                  <Button variant="ghost" size="sm" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>

                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Añadir al Carrito
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-600">€{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Tallas:</span>
                      <div className="flex gap-1">
                        {product.sizes.slice(0, 3).map((size) => (
                          <Badge key={size} variant="outline" className="text-xs px-1 py-0">
                            {size}
                          </Badge>
                        ))}
                        {product.sizes.length > 3 && (
                          <span className="text-xs text-gray-500">+{product.sizes.length - 3}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Colores:</span>
                      <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color) => (
                          <div
                            key={color}
                            className={`w-4 h-4 rounded-full border border-gray-300 ${
                              color === "Negro"
                                ? "bg-black"
                                : color === "Blanco"
                                  ? "bg-white"
                                  : color === "Gris"
                                    ? "bg-gray-400"
                                    : color === "Azul" || color === "Azul Marino"
                                      ? "bg-blue-600"
                                      : color === "Rojo"
                                        ? "bg-red-500"
                                        : color === "Rosa"
                                          ? "bg-pink-400"
                                          : color === "Verde"
                                            ? "bg-green-500"
                                            : "bg-yellow-100"
                            }`}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar Más Productos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¡No te pierdas nuestras ofertas!</h2>
          <p className="text-xl opacity-90 mb-8">Suscríbete y recibe un 10% de descuento en tu primera compra</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Tu email" className="bg-white text-gray-900" />
            <Button className="bg-white text-purple-600 hover:bg-gray-100">Suscribirse</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                OLA<span className="text-yellow-300">EVENTOS</span>
              </h3>
              <p className="text-gray-400 mb-4">Merchandising oficial de la plataforma de eventos líder en España.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Atención al Cliente</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Envíos y Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guía de Tallas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Ropa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Accesorios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ediciones Limitadas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ofertas
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Términos de Venta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OLAEVENTOS. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
