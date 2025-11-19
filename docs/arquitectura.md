# 🏗️ Arquitectura General — Olaventos

Este documento describe la arquitectura global del proyecto Olaventos, enfocándose únicamente en cómo se relacionan los componentes principales del sistema y cómo fluye la información entre ellos.
Los detalles internos del frontend o backend se explican en sus documentos específicos.

### 📌 1. Visión General de la Arquitectura

Olaventos utiliza una arquitectura cliente-servidor moderna, basada en comunicación mediante API REST y servicios externos complementarios.

```
[ Usuario ]
     │
     ▼
[ Frontend Web (React) ]
     │  HTTP/HTTPS
     ▼
[ Backend (NestJS + MySQL) ]
     │
     ▼ 
BBDD (MySQL en Railway)
```

### 📌 2. Componentes Principales


**🖥️ Frontend — React + Vite + CSS**

- Renderizado de la interfaz.

- Validaciones básicas.

- Llamadas a la API.

- Manejo de sesión del usuario.

- Ruteo interno.


**⚙️ Backend — NestJS**

- Gestiona la lógica de negocio del sistema.

- Expone la API REST utilizada por el frontend.

- Administra autenticación, autorización y validación.

- Conecta y opera sobre la base de datos MySQL.


**🗄️ Base de Datos — MySQL**

- Base de datos relacional.

- Almacenada en Railway.

- Gestiona tablas para usuarios, organizadores, eventos, favoritos.


**✉️ Servicio externo: Web3Forms**

- Se utiliza para el formulario de contacto de la plataforma.

- El frontend envía los datos directamente a Web3Forms sin pasar por el backend.

- Permite manejar emails sin configurar un servicio propio.


### 📌 3. Flujo General del Sistema


**🔐 1) Autenticación**

1️⃣ Usuario completa login o registro en el frontend.

2️⃣ El frontend envía credenciales al backend.

3️⃣ El backend valida, genera token, y lo devuelve.

4️⃣ El frontend almacena el token y lo usa para futuras solicitudes.



**📅 2) Gestión y visualización de eventos**

1️⃣ El usuario ingresa al listado de eventos.

2️⃣ El frontend realiza solicitudes a la API (/events, filtros, búsquedas).

3️⃣ El backend consulta MySQL y devuelve los resultados.

4️⃣ El frontend renderiza la información con los estilos y componentes.


**💬 3) Interacción del usuario (intereses, favoritos, etc.)**

1️⃣ El usuario marca un evento como “Favorito.

2️⃣ El frontend envía el request con token.

3️⃣ El backend registra la acción en la base de datos.

4️⃣ Se actualiza el estado del frontend.


**✉️ 4) Formulario de contacto**

1️⃣ Usuario completa el formulario.

2️⃣ El frontend envía los datos a Web3Forms.

3️⃣ Web3Forms procesa y envía el email.

4️⃣ El usuario recibe confirmación en pantalla.



### 📌 4. Diagrama General de Arquitectura


``` css
                            ┌──────────────────────────┐
                            │        Usuario           │
                            └─────────────┬────────────┘
                                          │
                                          ▼
                     ┌───────────────────────────────┐
                     │  Frontend (React + Vite)       │
                     │  - UI/UX                       │
                     │  - Routing                      │
                     │  - Estados globales             │
                     │  - Llamadas a API               │
                     └─────────────┬───────────────┬──┘
                                   │               │
                                   │               │
                                   ▼               ▼
                ┌─────────────────────────┐   ┌──────────────────┐
                │       Backend           │   │   Web3Forms       │
                │   (NestJS + API REST)   │   │  (Email Service)  │
                └─────────────┬──────────┘   └──────────────────┘
                               │
                               ▼
                   ┌──────────────────────────┐
                   │  MySQL (Railway)     │
                   └──────────────────────────┘

```


### 📌 5. Despliegue y Entornos

- Frontend → servicio de hosting de apps web (Vercel).

- Backend → servidor Node (Railway).

- Base de datos → MySQL en Railway.

- Servicio externo → Web3Forms (sin despliegue propio).


### 📌 6. Decisiones Técnicas Relevantes

- Arquitectura separada front/back para facilitar escalabilidad.

- API REST como mecanismo principal de comunicación.

- Uso de un servicio externo para emails para evitar configuración de SMTP.

- MySQL elegido por estabilidad y relaciones claras