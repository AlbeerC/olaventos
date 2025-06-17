"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Star } from "lucide-react"

export default function EventMap() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const mapEvents = [
    {
      id: 1,
      title: "Festival de Música Electrónica",
      location: "Madrid",
      date: "15 Dic 2024",
      attendees: 1250,
      rating: 4.8,
      category: "Música",
      coordinates: { x: 40, y: 35 },
    },
    {
      id: 2,
      title: "Conferencia Tech Innovation",
      location: "Barcelona",
      date: "22 Dic 2024",
      attendees: 850,
      rating: 4.9,
      category: "Tecnología",
      coordinates: { x: 75, y: 25 },
    },
    {
      id: 3,
      title: "Feria Gastronómica",
      location: "Valencia",
      date: "28 Dic 2024",
      attendees: 2100,
      rating: 4.7,
      category: "Gastronomía",
      coordinates: { x: 65, y: 45 },
    },
    {
      id: 4,
      title: "Festival de Arte",
      location: "Sevilla",
      date: "5 Ene 2025",
      attendees: 950,
      rating: 4.6,
      category: "Arte",
      coordinates: { x: 25, y: 70 },
    },
    {
      id: 5,
      title: "Concierto Rock",
      location: "Bilbao",
      date: "12 Ene 2025",
      attendees: 1800,
      rating: 4.8,
      category: "Música",
      coordinates: { x: 45, y: 15 },
    },
  ]

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Map */}
      <div className="lg:col-span-2">
        <Card className="h-96 lg:h-[500px] overflow-hidden">
          <CardContent className="p-0 h-full relative">
            {/* Simplified Spain Map Background */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
              >
                {/* Simplified Spain outline */}
                <path
                  d="M15,25 L85,20 L90,35 L85,50 L80,65 L70,75 L50,80 L30,75 L20,65 L15,50 Z"
                  fill="#f0f9ff"
                  stroke="#e2e8f0"
                  strokeWidth="0.5"
                />
              </svg>

              {/* Event Markers */}
              {mapEvents.map((event) => (
                <div
                  key={event.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                    selectedEvent === event.id ? "scale-125 z-10" : "hover:scale-110"
                  }`}
                  style={{
                    left: `${event.coordinates.x}%`,
                    top: `${event.coordinates.y}%`,
                  }}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                      event.category === "Música"
                        ? "bg-purple-500"
                        : event.category === "Tecnología"
                          ? "bg-blue-500"
                          : event.category === "Gastronomía"
                            ? "bg-orange-500"
                            : event.category === "Arte"
                              ? "bg-pink-500"
                              : "bg-green-500"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-current"></div>
                  </div>

                  {selectedEvent === event.id && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 z-20">
                      <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                      <div className="flex items-center text-xs text-gray-600 mb-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {event.date}
                      </div>
                      <Badge className="text-xs mb-2" variant="secondary">
                        {event.category}
                      </Badge>
                      <Button size="sm" className="w-full text-xs">
                        Ver Detalles
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Eventos en el Mapa</h3>
        {mapEvents.map((event) => (
          <Card
            key={event.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedEvent === event.id ? "ring-2 ring-purple-500 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{event.title}</h4>
                <Badge
                  className={`text-xs ${
                    event.category === "Música"
                      ? "bg-purple-100 text-purple-700"
                      : event.category === "Tecnología"
                        ? "bg-blue-100 text-blue-700"
                        : event.category === "Gastronomía"
                          ? "bg-orange-100 text-orange-700"
                          : event.category === "Arte"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-green-100 text-green-700"
                  }`}
                  variant="secondary"
                >
                  {event.category}
                </Badge>
              </div>

              <div className="flex items-center text-xs text-gray-600 mb-1">
                <MapPin className="w-3 h-3 mr-1" />
                {event.location}
              </div>

              <div className="flex items-center text-xs text-gray-600 mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {event.date}
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-600">
                  <Users className="w-3 h-3 mr-1" />
                  {event.attendees}
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                  {event.rating}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
