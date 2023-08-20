# Utilizamos la imagen oficial de CouchDB
FROM couchdb:latest

# Establecemos las variables de entorno (puedes cambiar 'admin' y 'password' según tus preferencias)
ENV COUCHDB_USER=admin
ENV COUCHDB_PASSWORD=admin

# Exponemos el puerto por defecto de CouchDB
EXPOSE 5984

# El comando por defecto para ejecutar CouchDB cuando se inicia el contenedor
CMD ["couchdb"]


# docker build -t my_couchdb_image .
# docker run -d -p 5984:5984 --name my_couchdb_container my_couchdb_image