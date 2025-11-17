# 📘 Olaventos – Frontend

Frontend de Olaventos, una plataforma web diseñada para conectar a organizadores de eventos con la comunidad de Olavarría.
Permite explorar eventos locales, filtrarlos, ver información detallada, registrarse como usuario u organizador y administrar eventos según el rol.

## 🛠️ Tecnologías Utilizadas

- **React** (con Vite)
- **JavaScript + JSX**
- **CSS puro**
- **React Router DOM**
- **Context API** (estado global)
- **Google Maps JavaScript API**
- **Fetch**
- **Vercel** (deploy)

## 📁 Estructura del Proyecto

\`\`\`
src/
  components/     # Componentes reutilizables de UI
  pages/          # Vistas principales del sitio
  context/        # Contextos globales (auth, favoritos, etc.)
  utils/          # Funciones auxiliares
  assets/         # Imágenes, íconos, recursos estáticos
\`\`\`

## ⚙️ Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio
\`\`\`bash
git clone <url-del-repo>
\`\`\`

### 2️⃣ Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3️⃣ Crear el archivo de variables de entorno

En la raíz del proyecto, crear un archivo `.env`:

\`\`\`env
VITE_API_URL="https://<tu-backend>/api"
\`\`\`

### 4️⃣ Ejecutar en modo desarrollo
\`\`\`bash
npm run dev
\`\`\`

## 🔌 Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base del backend (NestJS + Railway) |

## 🚀 Deploy

El frontend está desplegado en Vercel:

👉 **https://olaventos.vercel.app**

## ✨ Funcionalidades Principales

### 🏠 Página de Inicio
- Imagen principal + Call To Action
- Sección "Sobre nosotros"
- Carrusel automático con eventos destacados
- Formulario de contacto conectado a correo electrónico

### 🎟️ Exploración de Eventos
Página "Eventos" con:
- Lista completa de eventos
- Filtros por categoría
- Búsqueda por texto
- Cada evento incluye imagen, nombre, categoría y fecha.

### 📍 Detalle de Evento
- Descripción completa
- Información del organizador
- Ubicación en Google Maps
- Botones como "Me interesa", "Agregar a favoritos", etc.

### 🔐 Autenticación
- Registro e inicio de sesión con email y contraseña
- **Roles:**
  - Usuario común
  - Organizador
- Acceso a rutas protegidas según el rol

### 🧑‍💼 Paneles de Administración

#### Usuarios Comunes
- Ver eventos marcados como favoritos o guardados

#### Organizadores
- Crear, editar y eliminar eventos
- Gestionar perfil y publicaciones

#### Administradores Generales
- Aprobar nuevas cuentas de organizadores
- Gestionar permisos y altas


## 🧭 Roadmap / Mejoras Futuras

- Sistema completo de notificaciones
- Integración con Google Calendar / iCal
- Favoritos optimizados para móviles
- Filtros avanzados (fecha, ubicación, precio)
- Modo oscuro
- Perfil de usuario más completo
- Dashboard con estadísticas para organizadores

## 📄 Licencia

Proyecto académico – uso educativo.
