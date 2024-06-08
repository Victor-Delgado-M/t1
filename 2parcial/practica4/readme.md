# Mi Proyecto REST en Node.js con Express y Axios

Este es un proyecto de ejemplo para un servicio REST desarrollado en Node.js utilizando Express para el servidor y Axios para hacer solicitudes HTTP a otros servicios.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la carpeta del proyecto y ejecuta `npm install` para instalar las dependencias.

## Configuración

- Asegúrate de tener Node.js y npm instalados en tu sistema.
- El archivo principal del servidor es `index.ts`.

## Uso

1. Ejecuta `npm start` para iniciar el servidor en el puerto 4000.
2. Accede a las siguientes rutas:

   - Ruta principal del servidor: `http://localhost:4000/`
   - Ruta para obtener datos del otro servicio REST: `http://localhost:4000/external-data`

## Dependencias

- Express: Framework web para Node.js.
- Axios: Cliente HTTP para hacer solicitudes a otros servicios.
- Cors: Middleware para habilitar CORS en Express.

