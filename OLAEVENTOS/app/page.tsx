import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Star, Clock, Ticket } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import EventMap from "@/components/event-map"
import UpcomingEvents from "@/components/upcoming-events"

export default function HomePage() {
  const featuredEvents = [
    {
      id: 1,
      title: "Festival de Música Electrónica 2024",
      date: "15 Dic 2024",
      time: "20:00",
      location: "Estadio Nacional, Madrid",
      price: "€45",
      image: "/placeholder.svg?height=200&width=300",
      category: "Música",
      attendees: 1250,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Conferencia Tech Innovation",
      date: "22 Dic 2024",
      time: "09:00",
      location: "Centro de Convenciones, Barcelona",
      price: "€120",
      image: "/placeholder.svg?height=200&width=300",
      category: "Tecnología",
      attendees: 850,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Feria Gastronómica Internacional",
      date: "28 Dic 2024",
      time: "12:00",
      location: "Palacio de Exposiciones, Valencia",
      price: "€25",
      image: "/placeholder.svg?height=200&width=300",
      category: "Gastronomía",
      attendees: 2100,
      rating: 4.7,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              OLA<span className="text-yellow-300">EVENTOS</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Descubre, conecta y vive experiencias únicas en los mejores eventos de España
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Calendar className="mr-2 w-5 h-5" />
                Explorar Eventos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Ticket className="mr-2 w-5 h-5" />
                Crear Evento
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Eventos Destacados</h2>
            <p className="text-xl text-gray-600">Los eventos más populares que no te puedes perder</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-3 left-3 bg-purple-600">{event.category}</Badge>
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {event.price}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees} asistentes
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {event.rating}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Ver Todos los Eventos
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Eventos Cerca de Ti</h2>
            <p className="text-xl text-gray-600">Encuentra eventos en tu ciudad y alrededores</p>
          </div>
          <EventMap />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <UpcomingEvents />
        </div>
      </section>

      {/* Merchandising Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Merchandising Oficial</h2>
            <p className="text-xl text-gray-600">Lleva contigo el recuerdo de tus eventos favoritos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Camiseta OLAEVENTOS", price: "€19.99", image: "/placeholder.svg?height=200&width=200" },
              { name: "Gorra Festival 2024", price: "€14.99", image: "/placeholder.svg?height=200&width=200" },
              { name: "Tote Bag Eventos", price: "€9.99", image: "/placeholder.svg?height=200&width=200" },
              { name: "Sudadera Premium", price: "€34.99", image: "/placeholder.svg?height=200&width=200" },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-lg font-bold text-purple-600 mb-3">{item.price}</p>
                  <Button className="w-full" variant="outline">
                    Añadir al Carrito
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/merchandising">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Ver Toda la Tienda
              </Button>
            </Link>
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
              <p className="text-gray-400 mb-4">
                La plataforma líder en España para descubrir y disfrutar de los mejores eventos.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Eventos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Música
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tecnología
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Gastronomía
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Deportes
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Términos
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
