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
    myDatabase.list({ include_docs: true }).then(body => {
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
            books: req.body.books || []
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

app.patch('/api/authors/:authorId/edit', async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const updatedAuthorData = {
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            countryOfOrigin: req.body.countryOfOrigin,
            shortDescription: req.body.shortDescription,
            books: req.body.books || []
        };

        const currentDoc = await myDatabase.get(authorId);

        const updatedDoc = { ...currentDoc, ...updatedAuthorData };

        const response = await myDatabase.insert(updatedDoc);

        res.json(response);

    } catch (error) {
        if (error.code === 'EDOCMISSING') {
            res.status(404).send('Author not found');
        } else {
            console.error('Error updating author', error);
            res.status(500).send('Error updating author');
        }
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

app.get('/api/books/all', (req, res) => {
    myDatabase.list({ include_docs: true }).then(body => {
        
        const books = body.rows.flatMap(author => author.doc.books);
        res.send(books);
    }).catch(error => {
        console.error('Error retrieving documents', error);
    });
})


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

app.delete('/api/authors/:authorId/books/:bookId/reviews/:reviewId', async (req, res) => {
    try {
        const { authorId, bookId, reviewId } = req.params;
        const author = await myDatabase.get(authorId);
        const book = author.books.find(book => book._id === bookId);

        book.reviews = book.reviews.filter(review => review._id !== reviewId);

        const response = await myDatabase.insert(author);

        res.json(response);
    } catch (error) {
        console.error('Error deleting review', error);
        res.status(500).send('Error deleting review');
    }
});



// █▀▀ █ █ ▀▀█▀▀ █▀▀█ █▀▀█ 
// █▀▀ ▄▀▄   █   █▄▄▀ █▄▄█ 
// ▀▀▀ ▀ ▀   ▀   ▀  ▀ ▀  ▀

app.post('/api/populate', async (req, res) => {

    try {
        const fs = require('fs');
        fs.readFile('MOCK_DATA.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error reading data file');
            } else {
                const dataObj = JSON.parse(data);

                myDatabase.bulk({docs: dataObj}, function(err, result) {
                    if (err) {
                        console.error('Error populating database', err);
                        res.status(500).send('Error populating database');
                    } else {
                        console.log(result);
                        res.status(200).send('Data populated successfully');
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error populating database', error);
        res.status(500).send('Error populating database');
    }
});



app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

