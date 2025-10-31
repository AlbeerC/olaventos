import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { EventosProvider } from './context/EventosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <EventosProvider>
        <App />
      </EventosProvider>
    </AuthProvider>
  </StrictMode>,
)
