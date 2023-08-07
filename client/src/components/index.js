import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Populate from './populate'
import AuthorIndex from './Author/index';

function Index() {
    // useEffect(() => {
    //     const getAllBooks = async () => {
    //         const response = await fetch('/api/books/all');
    //         const body = await response.json();
    //         console.log(body);

    //     }
    //     getAllBooks();
    // }, []);
    return (
        <div>
            <Link to="/authors/all">Go to authors</Link>
            <Link to="/authorsTable">Go to authors table</Link>
            <Populate />
            <Link to="/books/top">Top rated</Link>
        </div>
    )
}

export default Index