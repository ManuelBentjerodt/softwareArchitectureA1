import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const CreateBook = () => {
    const navigate = useNavigate(); 
    const { authorId } = useParams();
    const [book, setBook] = useState({
        _id: uuidv4(),
        name: '',
        summary: '',
        dateOfPublication: '',
        numberOfSales: 0,
        reviews: [],
    });

    const handleChange = e => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const createBook = async () => {
            const response = await fetch(`/api/authors/${authorId}/books`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            const body = await response.json();
        };
        createBook();
        navigate(-1);
    };

    return (
        <div>
            <h1>Create Author</h1>
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
                    <input type="date" name="dateOfPublication" value={book.dateOfPublication} onChange={handleChange} required />
                </label>
                {/* <label>
                    Number of Sales:
                    <input type="number" name="numberOfSales" value={book.numberOfSales} onChange={handleChange} required />
                </label> */}
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateBook;
