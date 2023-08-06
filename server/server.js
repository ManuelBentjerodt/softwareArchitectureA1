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


// █▀▀█ █  █ ▀▀█▀▀ █  █ █▀▀█ █▀▀█ █▀▀ 
// █▄▄█ █  █   █   █▀▀█ █  █ █▄▄▀ ▀▀█ 
// ▀  ▀ ▀▀▀▀   ▀   ▀  ▀ ▀▀▀▀ ▀  ▀ ▀▀▀ 

app.get('/api/authors/all', (req, res) => {
    myDatabase.list({ include_docs: true}).then(body => {
        console.log('All documents');
        res.send(body);
    }).catch(error => {
        console.error('Error retrieving documents', error);
    });
})

app.get('/api/authors/:authorId', async (req, res) => {
    try {
        const { authorId } = req.params;
        const author = await myDatabase.get(authorId);
        res.json(author);

    } catch (error) {
        console.error('Error getting author', error);
        res.status(500).send('Error getting author');
    }
});

app.post('/api/authors/new', async (req, res) => {
    try {
        const newAuthor = {
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            countryOfOrigin: req.body.countryOfOrigin,
            shortDescription: req.body.shortDescription,
        };

        const response = await myDatabase.insert(newAuthor);
        res.json(response);

    } catch (error) {
        console.error('Error creating new author', error);
        res.status(500).send('Error creating new author');
    }
});

app.delete('/api/authors/:authorId', async (req, res) => {
    try {
        const { authorId } = req.params;
        const author = await myDatabase.get(authorId);

        await myDatabase.destroy(authorId, author._rev);

        res.status(200).send('Author deleted');

    } catch (error) {
        console.error('Error deleting author', error);
        res.status(500).send('Error deleting author');
    }
});

// █▀▀▄ █▀▀█ █▀▀█ █ █ █▀▀ 
// █▀▀▄ █  █ █  █ █▀▄ ▀▀█ 
// ▀▀▀  ▀▀▀▀ ▀▀▀▀ ▀ ▀ ▀▀▀ 

app.get('/api/authors/:authorId/books/:bookId', async (req, res) => {
    try {
        const { authorId, bookId } = req.params;
        const author = await myDatabase.get(authorId);
        const book = author.books.find(book => book._id === bookId);

        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }

    } catch (error) {
        console.error('Error retrieving book', error);
        res.status(500).send('Error retrieving book');
    }
});

app.patch('/api/authors/:authorId/books', async (req, res) => {
    try {

        const { authorId } = req.params;
        const newBook = req.body;
        const author = await myDatabase.get(authorId);

        if (!author.books) {
            author.books = [];
        }

        author.books.push(newBook);

        const response = await myDatabase.insert(author);

        res.json(response);
    } catch (error) {
        console.error('Error adding new book', error);
        res.status(500).send('Error adding new book');
    }
});

app.delete('/api/authors/:authorId/books/:bookId', async (req, res) => {
    try {
        const { authorId, bookId } = req.params;
        const author = await myDatabase.get(authorId);

        author.books = author.books.filter(book => book._id !== bookId);

        const response = await myDatabase.insert(author);

        res.json(response);
    } catch (error) {
        console.error('Error deleting book', error);
        res.status(500).send('Error deleting book');
    }
});

// █▀▀█ █▀▀ ▀█ █▀  ▀  █▀▀ █   █ █▀▀ 
// █▄▄▀ █▀▀  █▄█   █  █▀▀ █▄█▄█ ▀▀█ 
// ▀  ▀ ▀▀▀   ▀    ▀  ▀▀▀  ▀ ▀  ▀▀▀


app.patch('/api/authors/:authorId/books/:bookId/reviews/new', async (req, res) => {
    try {
        const { authorId, bookId } = req.params;
        const newReview = req.body;
        const author = await myDatabase.get(authorId);
        const book = author.books.find(book => book._id === bookId);

        if (!book.reviews) {
            book.reviews = [];
        }

        book.reviews.push(newReview);

        const response = await myDatabase.insert(author);

        res.json(response);
    } catch (error) {
        console.error('Error adding new review', error);
        res.status(500).send('Error adding new review');
    }
});



app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

