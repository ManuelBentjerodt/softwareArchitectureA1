require('dotenv').config({ path: '../.env' })


const express = require('express');
const app = express();

const PORT = process.env.EXPRESS_PORT;
const COUCH_DB_URL = process.env.COUCH_DB_URL;

const nano = require('nano')(COUCH_DB_URL);

// Asegúrate de que tu base de datos exista. Si no existe, créala.
const dbName = 'assignament1';
nano.db.create(dbName).then(response => {
    console.log('Database created!', response);
}).catch(error => {
    if (error.statusCode === 412) {
        console.log('Database already exists.');
    } else {
        console.error('Error creating database', error);
    }
});

// Ahora, obtén una referencia a tu base de datos.
const myDatabase = nano.use(dbName);

// Crear un nuevo documento en tu base de datos.
// const newDocument = {
//     _id: 'my_first_document',
//     title: 'Hello, world!',
//     content: 'This is my first document in CouchDB!'
// };
// myDatabase.insert(newDocument).then(response => {
//     console.log('Document inserted!', response);
// }).catch(error => {
//     console.error('Error inserting document', error);
// });

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
