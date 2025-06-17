"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Menu, X, Search, ShoppingBag, MapPin, Bell } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              OLA<span className="text-purple-600">EVENTOS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/eventos" className="text-gray-600 hover:text-gray-900 transition-colors">
              Eventos
            </Link>
            <Link href="/mapa" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Mapa
            </Link>
            <Link href="/merchandising" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tienda
            </Link>
            <Link href="/crear-evento" className="text-gray-600 hover:text-gray-900 transition-colors">
              Crear Evento
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Buscar eventos..." className="bg-transparent outline-none flex-1 text-sm" />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {isLoggedIn && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-xs">
                  3
                </Badge>
              </Button>
            )}

            {/* Shopping Cart */}
            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-purple-600 text-xs">
                  2
                </Badge>
              </Button>
            </Link>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Mi Perfil
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  className="bg-transparent outline-none flex-1 text-sm"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link href="/eventos" className="text-gray-600 hover:text-gray-900 py-2">
                  Eventos
                </Link>
                <Link href="/mapa" className="text-gray-600 hover:text-gray-900 py-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Mapa
                </Link>
                <Link href="/merchandising" className="text-gray-600 hover:text-gray-900 py-2">
                  Tienda
                </Link>
                <Link href="/crear-evento" className="text-gray-600 hover:text-gray-900 py-2">
                  Crear Evento
                </Link>
              </nav>

              {/* Mobile Auth */}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/registro">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
