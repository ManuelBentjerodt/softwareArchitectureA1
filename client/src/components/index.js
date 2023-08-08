import React from 'react'
import { Link } from 'react-router-dom'
import Populate from './populate'

function Index() {

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <Link to="/authors/all">Authors list</Link>
            <Link to="/authorsTable">Authors table</Link>
            <Link to="/books/top">Top 10 rated books</Link>
            <Link to="/books/top50">Top 50 selling books</Link>
            <Link to="/search">Search</Link>
            <Populate />
        </div>
    )
}

export default Index
