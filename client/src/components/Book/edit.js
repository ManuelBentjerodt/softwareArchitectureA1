import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import formatDate from "../Util/formatDate";

const EditBook = () => {
    const navigate = useNavigate(); 
    const { authorId, bookId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}`);
            const data = await response.json();
            setBook(data);
        }
        fetchBook();
    }, [authorId, bookId]);

    const handleChange = e => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const updateBook = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            const body = await response.json();
            console.log(body);
        };
        updateBook();
        navigate(-1);
    };

    if (!book) return null;  // si el libro no se ha cargado todavía, no renderizar nada

    return (
        <div>
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={book.name} onChange={handleChange} required />
                </label>
                <label>
                    Summary:
                    <input type="text" name="summary" value={book.summary} onChange={handleChange} required />
                </label>
                <label>
                    Date of Publication:
                    <input type="date" name="dateOfPublication" value={formatDate(book.dateOfPublication)} onChange={handleChange} required />
                </label>
                {/* <label>
                    Number of Sales:
                    <input type="number" name="numberOfSales" value={book.numberOfSales} onChange={handleChange} required />
                </label> */}
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditBook;
