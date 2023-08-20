# Establece la imagen base
FROM node:20

# Crea un directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de tu proyecto
RUN npm install

# Copia los demás archivos de tu proyecto
COPY . .

# Exponer el puerto que utiliza el servidor de desarrollo (por defecto 3000 para create-react-app)
EXPOSE 3000

# Comando para iniciar la aplicación React en modo de desarrollo
CMD ["npm", "start"]
