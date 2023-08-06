// AuthorDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoBack from '../goBack';

function AuthorDetails() {
    const { id } = useParams();
    const [authorDetails, setAuthorDetails] = useState({});

    useEffect(() => {
        const getAuthorDetails = async () => {
            const response = await fetch(`/api/authors/${id}`);
            const body = await response.json();
            console.log(body);

            setAuthorDetails(body);
        };

        getAuthorDetails();
    }, [id]);

    return (
        <div>
            <h1>Name: {authorDetails.name}</h1>
            <p>Description: {authorDetails.shortDescription}</p>
            <h2>books:</h2>
            <ul>
                {authorDetails.books && authorDetails.books.map(book => (
                    <li key={book._id}>
                        <Link to={`/authors/${id}/books/${book._id}`}>{book.name}</Link>
                    </li>
                ))}
            </ul>
            <GoBack />
        </div>
    );
}

export default AuthorDetails;
