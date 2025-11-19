# 📘 Backend Olaventos (NestJS + TypeORM + Railway MySQL)

## 📝 Descripción General

El backend provee la API REST que permite la autenticación de usuarios, la administración de eventos, la gestión de favoritos y el manejo de roles (usuarios, organizadores y administradores).

**Repositorio Backend** → [AlbeerC/olaventos-backend](https://github.com/AlbeerC/olaventos-backend)

## 🛠️ Tecnologías Utilizadas

- **NestJS** (Framework backend)
- **TypeScript**
- **TypeORM** (ORM para base de datos)
- **MySQL** (Railway)
- **JWT** para autenticación
- **bcrypt** para hasheo de contraseñas

## 📁 Estructura Principal

El backend cuenta con tres módulos clave:

### 🔐 Auth
Registro, login, registro de organizadores y generación de tokens.

### 👤 Usuarios
CRUD de usuarios, actualización de datos personales, cambio de contraseña y aprobación de organizadores.

### 🎟️ Eventos
CRUD de eventos creados por organizadores.

### ⭐ Favoritos
Guardar/eliminar eventos favoritos (solo usuarios logueados).

## 🔌 Endpoints Principales

### 🔐 Auth Controller

- `POST /auth/login` – Iniciar sesión
- `POST /auth/register` – Registrar usuario
- `POST /auth/register-organizer` – Registrar organizador (requiere aprobación)

### 👤 Usuarios Controller

- `GET /usuarios` – Listar usuarios
- `GET /usuarios/organizadores` – Listar organizadores
- `GET /usuarios/:id` – Obtener usuario
- `POST /usuarios` – Crear usuario
- `PUT /usuarios/:id` – Actualizar usuario
- `DELETE /usuarios/:id` – Eliminar usuario
- `PATCH /usuarios/:id/approve` – Aprobar organizador

**🔒 Rutas protegidas por JWT:**
- `PATCH /usuarios/me` – Actualizar perfil propio
- `PATCH /usuarios/me/password` – Cambiar contraseña

### 🎫 Eventos Controller

- `POST /eventos` – Crear evento
- `GET /eventos` – Listar todos
- `GET /eventos/:id` – Detalle de evento
- `PATCH /eventos/:id` – Editar
- `DELETE /eventos/:id` – Eliminar

### ⭐ Favoritos Controller (JWT requerido)

- `POST /favoritos` – Agregar favorito
- `GET /favoritos` – Listar favoritos del usuario
- `DELETE /favoritos/:eventoId` – Eliminar favorito

## 🗄️ Base de Datos

Las tablas principales son:

### 👤 Usuarios

- `id`
- `nombre`
- `email`
- `contraseña` (hasheada con bcrypt)
- `rol` (user, organizer, admin)
- `estado de aprobación` para organizadores

### 🎫 Eventos

- `id`
- `título`
- `descripción`
- `fecha`
- `hora`
- `categoría`
- `lugar`
- `creador` (relación con usuario)

### ⭐ Favoritos

- `id`
- `usuarioId`
- `eventoId`

## ⚙️ Configuración del Entorno

En la raíz del proyecto, crear un archivo `.env` con las variables:

```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=3000
NODE_ENV=development
```

## ▶️ Cómo Ejecutar el Proyecto

### 1️⃣ Instalar dependencias

```
npm install
```

### 2️⃣ Modo desarrollo

```
npm run start:dev
```

### 3️⃣ Conexión a la base de datos

En local, podés usar MySQL o la base remota de Railway.

Si usás Railway, el backend se conecta automáticamente usando las credenciales del `.env`.

## 🔄 Sincronización del esquema

El proyecto usa:

```typescript
synchronize: process.env.NODE_ENV !== 'production'
```

- 🧪 En desarrollo: crea y actualiza tablas automáticamente
- 🚫 En producción: evita modificaciones peligrosas en Railway

## 🚀 Deployment

El proyecto está deployado en Railway, tanto el servidor como la base de datos.
Railway lee automáticamente las variables de entorno configuradas en su panel.

## 🗺️ Diagrama de la Base de Datos (ERD)

El modelo de datos de Olaventos se basa en tres entidades principales:

- 👤 Usuarios: roles, gestión, aprobación de organizadores.

- 🎫 Eventos: información detallada de cada evento.

- ⭐ Favoritos: relación entre usuarios y eventos.

```scss
Usuarios (1) ────< Favoritos >──── (1) Eventos
```

### 🔗 Relaciones:

- Un usuario puede marcar muchos eventos como favoritos.
- Un evento puede estar en los favoritos de muchos usuarios.
- Al eliminar usuario o evento, sus favoritos se eliminan automáticamente (CASCADE).

Cada evento almacena organizadorId, que referencia al usuario creador.
