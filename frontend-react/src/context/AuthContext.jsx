import { createContext, useEffect, useState, useContext } from "react"

// Crear el contexto
const AuthContext = createContext()

// Crear el provider
export function AuthProvider ( {children} ) {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const tokenGuardado = localStorage.getItem("token")
        const userGuardado = localStorage.getItem("user")

        if (tokenGuardado && userGuardado) {
            setToken(tokenGuardado)
            setUser(JSON.parse(userGuardado))
        }
    }, [])

    const login = (userDatos, tokenJwt) => {
        setUser(userDatos)
        setToken(tokenJwt)
        localStorage.setItem("user", JSON.stringify(userDatos))
        localStorage.setItem("token", tokenJwt)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    // Funciones y estados a exportar
    const value = {
        user,
        token,
        login,
        logout
    }

    // Retornar el provider
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook para facilitar el uso del context en componentes
export const useAuth = () => useContext(AuthContext)