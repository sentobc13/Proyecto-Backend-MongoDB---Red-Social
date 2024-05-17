# Red Social API

Este proyecto consiste en una API REST para una red social, desarrollada con Node.js, Express y MongoDB/Mongoose. La API permite a los usuarios registrarse, iniciar sesión, crear y gestionar posts y comentarios, y dar y quitar likes a los posts.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- JWT (JSON Web Token)

## Requisitos del Proyecto

- Registro de usuarios utilizando Bcrypt.
- Login de usuarios con token y middleware de autenticación.
- CRUD completo para posts.
- Funcionalidad de dar y quitar like a un post.
- Backend desplegado en producción.
- Gestión de ramas en Git (main y develop).
- README detallado y bien presentado.

## Despliegue del Proyecto

- **El proyecto se encuentra desplegado en:**
https://documenter.getpostman.com/view/34523083/2sA3JT2xmR


## Testing de Endpoints

Se han añadido pruebas para asegurar el correcto funcionamiento de los endpoints `users`, `posts` y `comments`.

### Endpoints Probados

1. **Users**: Se han probado las operaciones de creación, lectura, actualización y eliminación.
2. **Posts**: Se han probado las operaciones de creación, lectura, actualización y eliminación.
3. **Comments**: Se han probado las operaciones de creación y eliminación.

### Resultados de las Pruebas

Todas las pruebas se han ejecutado correctamente y los endpoints funcionan como se esperaba.

## Endpoints

### Documentación Postman

- **Enlace**
https://documenter.getpostman.com/view/34523083/2sA3JT2xmR

### Usuarios

- **Registro de usuario**
  - `POST /register`
  - Campos requeridos: `username`, `email`, `password`

- **Login de usuario**
  - `POST /login`
  - Campos requeridos: `email`, `password`

- **Información del usuario conectado**
  - `GET /me`
  - Requiere autenticación (token)

- **Logout de usuario**
  - `POST /logout`
  - Requiere autenticación (token)

### Posts

- **Crear un post**
  - `POST /posts`
  - Campos requeridos: `title`, `content`
  - Requiere autenticación (token)

- **Actualizar un post**
  - `PUT /posts/:postId`
  - Campos requeridos: `title`, `content`
  - Requiere autenticación (token)
  - Middleware de autoría

- **Eliminar un post**
  - `DELETE /posts/:postId`
  - Requiere autenticación (token)
  - Middleware de autoría

- **Traer todos los posts**
  - `GET /posts`
  - Incluye usuarios que hicieron los posts y comentarios de los posts
  - Paginación de 10 en 10

- **Buscar post por nombre**
  - `GET /posts/search?name=nombre`

- **Buscar post por ID**
  - `GET /posts/:postId`

- **Dar like a un post**
  - `POST /posts/:postId/like`
  - Requiere autenticación (token)

- **Quitar like a un post**
  - `POST /posts/:postId/unlike`
  - Requiere autenticación (token)

### Comentarios

- **Crear un comentario en un post**
  - `POST /posts/:postId/comments`
  - Campos requeridos: `content`
  - Requiere autenticación (token)




## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
