# Establece la imagen base
FROM node:20 AS build-stage

# Crea un directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de tu proyecto
RUN npm install

# Copia los demás archivos de tu proyecto
COPY . .

COPY default.conf /etc/nginx/conf.d/default.conf

# Construye la aplicación React para producción
RUN npm run build

# Fase de producción: usar nginx para servir la aplicación construida
FROM nginx:stable-alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expone el puerto 80 (nginx por defecto utiliza el puerto 80)
EXPOSE 80

# Comando por defecto de nginx para iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]


# docker build -t my_react_app_image .
# docker run -p 8080:80 -d --name my_react_app_container my_react_app_image
