import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const CreateAuthor = () => {
    const navigate = useNavigate(); 
    const [author, setAuthor] = useState({
        name: '',
        dateOfBirth: '',
        countryOfOrigin: '',
        shortDescription: '',
    });

    const handleChange = e => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(author);
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
            console.log(body);
        };
        console.log("createAuthor");
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
