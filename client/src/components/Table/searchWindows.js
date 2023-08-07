import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from './table';

function Search() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                Cell: ({ cell: { value }, row: { original } }) => (
                    <Link to={`/authors/${original.authorId}/books/${original._id}`}>{value}</Link>
                ),
            },
            {
                Header: 'Summary',
                accessor: 'summary',
            },
        ],
        []
    );

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const searchBooks = async () => {
            const response = await fetch(`/api/search/${query}`);
            const data = await response.json();
            console.log(data);
            setBooks(data);
        };
        searchBooks();
    };

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="query" value={query} onChange={handleChange} required />
                <button type="submit">Search</button>
            </form>
            <Table columns={columns} data={books} />
        </div>
    );
}

export default Search;
