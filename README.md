# Blog API

## 1. ¿Qué es este proyecto?

Este proyecto es una API REST para gestionar usuarios y posts. Permite crear, listar, actualizar y eliminar usuarios y publicaciones, además de consultar los posts asociados a un usuario.

La aplicación está hecha con Express, TypeScript y Prisma, y usa PostgreSQL como base de datos.

## 2. ¿Qué tecnologías usa?

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- CORS
- Helmet

### Explicación de la arquitectura en capas

El código está separado por responsabilidades para que sea más fácil de mantener y testear:

- `routes`: define los endpoints y decide qué controlador se ejecuta.
- `controllers`: recibe la request, extrae datos y llama al servicio correspondiente.
- `services`: contiene la lógica de negocio y validaciones principales.
- `repositories`: habla directamente con Prisma y ejecuta consultas a la base de datos.
- `lib`: concentra configuraciones compartidas, como la instancia de Prisma.
- `middlewares`: maneja comportamiento transversal, como errores.

Ese diseño evita mezclar HTTP, lógica de negocio y acceso a datos en un mismo archivo.

## 3. ¿Cómo lo levanto en mi máquina?

### Variables de entorno necesarias

Creá un archivo `.env` con, al menos:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/blog_api
```

- `PORT`: puerto donde levanta la API.
- `DATABASE_URL`: cadena de conexión a PostgreSQL.

### Instalar dependencias

```bash
npm install
```

### Correr el proyecto en desarrollo

```bash
npm run dev
```

Ese comando ejecuta `nodemon --exec tsx src/index.ts`.

### Cómo correr las migraciones de Prisma

Antes de levantar la app por primera vez, corré las migraciones para crear las tablas en la base de datos:

```bash
npx prisma migrate dev --name init
```

Si necesitás generar el cliente de Prisma manualmente, podés usar:

```bash
npx prisma generate
```

## 4. ¿Qué endpoints tiene?

La API expone dos recursos principales: `users` y `posts`.

### Users

- `GET /users`  
  Lista todos los usuarios.

- `GET /users/:id`  
  Devuelve un usuario por ID.

- `POST /users`  
  Crea un usuario nuevo.

- `PUT /users/:id`  
  Actualiza un usuario existente.

- `DELETE /users/:id`  
  Elimina un usuario.

- `GET /users/:id/posts`  
  Devuelve todos los posts de un usuario.

### Posts

- `GET /posts`  
  Lista todos los posts.

- `GET /posts/:id`  
  Devuelve un post por ID.

- `POST /posts`  
  Crea un post nuevo.

- `PUT /posts/:id`  
  Actualiza un post existente.

- `DELETE /posts/:id`  
  Elimina un post.

### Respuestas de error más comunes

- `400 Bad Request`: faltan campos o la operación no es válida.
- `404 Not Found`: el recurso no existe.
- `409 Conflict`: por ejemplo, email duplicado.
- `500 Internal Server Error`: error inesperado.

### Ejemplos de body para POST y PUT

#### POST /users

```json
{
  "name": "Bruno",
  "surname": "Perez",
  "email": "bruno@example.com"
}
```

#### PUT /users/:id

```json
{
  "name": "Bruno",
  "surname": "Gomez",
  "email": "bruno.gomez@example.com"
}
```

#### POST /posts

```json
{
  "title": "Mi primer post",
  "content": "Este es el contenido del post.",
  "authorId": "ID_DEL_USUARIO"
}
```

#### PUT /posts/:id

```json
{
  "title": "Título actualizado",
  "content": "Contenido actualizado"
}
```

## 5. ¿Qué estructura tiene el código?

La estructura principal del proyecto es esta:

```text
src/
  index.ts
  controllers/
  errors/
  lib/
  middlewares/
  repositories/
  routes/
  services/
  types/
prisma/
  schema.prisma
  migrations/
```

### Detalle por carpeta

- `src/index.ts`: punto de entrada de la app. Configura `cors`, `helmet`, JSON parser, rutas y middleware de errores.
- `src/routes`: define los endpoints de `users` y `posts`.
- `src/controllers`: adapta la request HTTP a la lógica de negocio.
- `src/services`: valida reglas de negocio, revisa existencia de registros y lanza errores controlados.
- `src/repositories`: ejecuta consultas con Prisma.
- `src/lib/prisma.ts`: crea y exporta la instancia de PrismaClient.
- `src/middlewares/errorHandler.middleware.ts`: transforma errores en respuestas JSON.
- `src/errors/AppError.ts`: clase de error personalizada para errores esperados.
- `prisma/schema.prisma`: modelo de datos de `User` y `Post`.
- `prisma/migrations`: historial de migraciones.

## Manejo de errores

El proyecto usa una clase personalizada llamada `AppError` para errores esperados, como:

- usuario no encontrado
- post no encontrado
- email duplicado
- campos obligatorios faltantes

Cuando un servicio detecta uno de esos casos, lanza un error con el código HTTP correspondiente. Después, el middleware global de errores responde con un JSON del estilo:

```json
{
  "error": "User with id 123 not found"
}
```

## CORS y Helmet

En `src/index.ts` se usan dos middlewares importantes:

- `cors()`: habilita solicitudes desde otros orígenes.
- `helmet()`: agrega headers de seguridad para endurecer la aplicación.

Hoy están configurados de forma general. Si vas a poner la API en producción, conviene restringir `cors` a los dominios permitidos.

## Casos de prueba sugeridos

### GET /users

- Debe devolver `200` y un array.
- Si no hay usuarios, debe devolver `200` con `[]`.

### GET /users/:id

- Con un ID existente, debe devolver `200`.
- Con un ID inexistente, debe devolver `404`.

### POST /users

- Con `name`, `surname` y `email`, debe devolver `201`.
- Si falta algún campo, debe devolver `400`.
- Si el email ya existe, debe devolver `409`.

### PUT /users/:id

- Con un ID válido, debe devolver `200`.
- Con un ID inexistente, debe devolver `404`.

### DELETE /users/:id

- Con un usuario existente sin restricciones, debe devolver `204`.
- Si el usuario tiene posts asociados, debe devolver `400`.

### GET /users/:id/posts

- Con un usuario existente, debe devolver `200` y sus posts.
- Con un usuario inexistente, debe devolver `404`.

### GET /posts

- Debe devolver `200` y un array.

### GET /posts/:id

- Con un ID existente, debe devolver `200`.
- Con un ID inexistente, debe devolver `404`.

### POST /posts

- Con `title`, `content` y `authorId`, debe devolver `201`.
- Si el `authorId` no existe, debe devolver `404`.
- Si faltan campos, debe devolver `400`.

### PUT /posts/:id

- Con un ID válido, debe devolver `200`.
- Con un ID inexistente, debe devolver `404`.

### DELETE /posts/:id

- Con un ID válido, debe devolver `204`.
- Con un ID inexistente, debe devolver `404`.
