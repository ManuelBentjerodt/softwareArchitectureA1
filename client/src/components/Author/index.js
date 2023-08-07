import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


function AuthorIndex() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const getAllAuthors = async () => {
            const response = await fetch('/api/authors/all');
            const body = await response.json();

            const fetchedAuthors = body.rows.map(row => row.doc);

            setAuthors(fetchedAuthors);
        };

        getAllAuthors();
    }, []);


    const handleDelete = async (authorId) => {
        const response = await fetch(`/api/authors/${authorId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Si la eliminación fue exitosa, actualiza la lista de autores
            setAuthors(authors.filter(author => author._id !== authorId));
        } else {
            console.error('Error deleting author');
        }
    };

    return (
        <div>
            <ul>
                {authors.map(author => (
                    <li key={author._id}>
                        <Link to={`/authors/${author._id}`}>{author.name} </Link>
                        <Link to={`/authors/${author._id}/edit`}>
                            <button>
                                Edit
                            </button>
                        </Link>
                        <button onClick={() => handleDelete(author._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <Link to={"/authors/new"}>create author</Link>

        </div>
    );
}

export default AuthorIndex;
