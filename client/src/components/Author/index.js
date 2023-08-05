import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AuthorDetails from './details';
import CreateAuthor from './create';

function AuthorIndex() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const getAllAuthors = async () => {
            const response = await fetch('/api/authors/all');
            const body = await response.json();

            const fetchedAuthors = body.rows.map(row => row.doc);

            setAuthors(fetchedAuthors);
            console.log(fetchedAuthors);
        };

        getAllAuthors();
    }, []);


    const handleDelete = async (id) => {
        const response = await fetch(`/api/authors/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Si la eliminación fue exitosa, actualiza la lista de autores
            setAuthors(authors.filter(author => author._id !== id));
        } else {
            console.error('Error deleting author');
        }
    };


    return (
        <div>
            <ul>
                {authors.map(author => (
                    <li key={author._id}>
                        <Link to={`/authors/${author._id}`}>{author.name}</Link>
                        <button onClick={() => handleDelete(author._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <Link to={"/authors/new"}>
                new
            </Link>


        </div>
    );
}

export default AuthorIndex;
