// AuthorDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoBack from '../goBack';

function AuthorDetails() {
    const { authorId } = useParams();
    const [authorDetails, setAuthorDetails] = useState({});

    useEffect(() => {
        const getAuthorDetails = async () => {
            const response = await fetch(`/api/authors/${authorId}`);
            const body = await response.json();
            setAuthorDetails({ ...body, books: body.books || [] });
        };

        getAuthorDetails();
    }, [authorId]);

    const handleDelete = async (idBook) => {
        const response = await fetch(`/api/authors/${authorId}/books/${idBook}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Si la eliminación fue exitosa, actualiza la lista de libros
            setAuthorDetails({
                ...authorDetails,
                books: authorDetails.books.filter((book) => book._id !== idBook),
            });
        } else {
            console.error('Error deleting book');
        }
    };

    return (
        <div>
            <h1>Name: {authorDetails.name}</h1>
            <p>Description: {authorDetails.shortDescription}</p>
            <Link to={`/authors/${authorId}/edit`}>
                <button>
                    Edit
                </button>
            </Link>
            <h2>books:</h2>
            <ul>
                {authorDetails.books && authorDetails.books.map(book => (
                    <li key={book._id}>
                        <Link to={`/authors/${authorId}/books/${book._id}`}>{book.name} </Link>
                        <Link to={`/authors/${authorId}/books/${book._id}/edit`}>
                            <button>
                                Edit
                            </button>
                        </Link>
                        <button onClick={() => handleDelete(book._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to={`/authors/${authorId}/books/new`}>
                create book
            </Link>
        </div>
    );
}

export default AuthorDetails;
