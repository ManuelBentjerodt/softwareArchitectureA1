import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



const CreateAuthor = () => {
    const navigate = useNavigate(); 
    const [author, setAuthor] = useState({
        _id: uuidv4(),
        name: '',
        dateOfBirth: '',
        countryOfOrigin: '',
        shortDescription: '',
        books: [],
    });

    const handleChange = e => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Here you would usually send the author object to your server or API
        const createAuthor = async () => {
            const response = await fetch('/api/authors/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(author),
            });
            const body = await response.json();
        };
        createAuthor();
        navigate(-1);
    };

    return (
        <div>
            <h1>Create Author</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={author.name} onChange={handleChange} required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={author.dateOfBirth} onChange={handleChange} required />
                </label>
                <label>
                    Country of Origin:
                    <input type="text" name="countryOfOrigin" value={author.countryOfOrigin} onChange={handleChange} required />
                </label>
                <label>
                    Short Description:
                    <textarea name="shortDescription" value={author.shortDescription} onChange={handleChange} required />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateAuthor;
