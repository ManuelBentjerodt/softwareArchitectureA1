import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AuthorDetails from './details';

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


    return (

            <div>
                <ul>
                    {authors.map(author => (
                        <li key={author._id}>
                            <Link to={`/authors/${author._id}`}>{author.name}</Link>
                        </li>
                    ))}
                </ul>

                <Routes>
                    <Route path="/authors/:id" element={<AuthorDetails />} />
                </Routes>
            </div>
    );
}


export default AuthorIndex;
