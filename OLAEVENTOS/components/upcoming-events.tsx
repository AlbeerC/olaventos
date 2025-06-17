"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react"

export default function UpcomingEvents() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Año Nuevo en la Plaza",
      date: "31 Dic 2024",
      time: "23:00",
      location: "Plaza Mayor, Madrid",
      category: "Celebración",
      attendees: 5000,
      price: "Gratis",
      daysLeft: 14,
    },
    {
      id: 2,
      title: "Maratón de Valencia 2025",
      date: "2 Ene 2025",
      time: "08:00",
      location: "Ciudad de las Artes, Valencia",
      category: "Deportes",
      attendees: 3500,
      price: "€35",
      daysLeft: 16,
    },
    {
      id: 3,
      title: "Feria del Libro",
      date: "8 Ene 2025",
      time: "10:00",
      location: "Parque del Retiro, Madrid",
      category: "Cultura",
      attendees: 1200,
      price: "€5",
      daysLeft: 22,
    },
    {
      id: 4,
      title: "Festival de Cine Independiente",
      date: "15 Ene 2025",
      time: "19:00",
      location: "Cines Verdi, Barcelona",
      category: "Cine",
      attendees: 800,
      price: "€12",
      daysLeft: 29,
    },
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
        <p className="text-xl text-gray-600">No te pierdas estos eventos que están por llegar</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <Badge
                    className={`mb-3 ${
                      event.category === "Celebración"
                        ? "bg-yellow-100 text-yellow-700"
                        : event.category === "Deportes"
                          ? "bg-green-100 text-green-700"
                          : event.category === "Cultura"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                    }`}
                    variant="secondary"
                  >
                    {event.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.daysLeft} días
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.attendees} interesados</span>
                  </div>
                  <div className="text-lg font-bold text-purple-600">{event.price}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Ticket className="w-4 h-4 mr-2" />
                  Obtener Entrada
                </Button>
                <Button variant="outline" className="flex-1">
                  Más Info
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Ver Calendario Completo
        </Button>
      </div>
    </div>
  )
}
