import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Populate from './populate'
import AuthorIndex from './Author/index';

function Index() {
    useEffect(() => {
        const getAllBooks = async () => {
            const response = await fetch('/api/books/all');
            const body = await response.json();
            console.log(body);

        }
        getAllBooks();
    }, []);
    return (
        <div>
            <Link to="/authors/all">Go to authors</Link>

            <Populate />
        </div>
    )
}

export default Index