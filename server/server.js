require('dotenv').config({ path: '../.env' })


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.EXPRESS_PORT;
const COUCH_DB_URL = process.env.COUCH_DB_URL;

const nano = require('nano')(COUCH_DB_URL);

// Asegúrate de que tu base de datos exista. Si no existe, créala.
const dbName = 'assignament1';

nano.db.create(dbName).then(response => {
    console.log('Database created!');
}).catch(error => {
    if (error.statusCode === 412) {
        console.log('Database already exists.');
    } else {
        console.error('Error creating database', error);
    }
});

// Ahora, obtén una referencia a tu base de datos.
const myDatabase = nano.use(dbName);



app.get('/api/authors/all', (req, res) => {
    myDatabase.list({ include_docs: true}).then(body => {
        console.log('All documents');
        res.send(body);
    }).catch(error => {
        console.error('Error retrieving documents', error);
    });
})

app.get('/api/authors/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const author = await myDatabase.get(id);
        res.json(author);
    } catch (error) {
        console.error('Error getting author', error);
        res.status(500).send('Error getting author');
    }
});



app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

