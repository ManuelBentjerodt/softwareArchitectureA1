# Establece la imagen base
FROM node:20

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de tu proyecto
RUN npm install

# Copia los demás archivos de tu proyecto
COPY . .

# Expone el puerto que tu aplicación utilizará
EXPOSE 5000

# Comando para ejecutar tu aplicación
CMD [ "node", "server.js" ]


# docker build -t my_node_app_image .
# docker run -p 3000:3000 -d --name my_node_app_container my_node_app_image
