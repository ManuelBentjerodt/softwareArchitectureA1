import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const EditAuthor = () => {
    const navigate = useNavigate();
    const { authorId } = useParams();
    const [author, setAuthor] = useState({
        _id: '',
        name: '',
        dateOfBirth: '',
        countryOfOrigin: '',
        shortDescription: '',
        books: [],
    });

    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch(`/api/authors/${authorId}`);
            const authorData = await response.json();
            setAuthor(authorData);
        };
        fetchAuthor();
    }, [authorId]);

    const handleChange = e => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value,
        });
    };

    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }


    const handleSubmit = e => {
        e.preventDefault();
        // Here you would usually send the updated author object to your server or API
        const updateAuthor = async () => {
            const response = await fetch(`/api/authors/${authorId}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(author),
            });
            const body = await response.json();
        };
        updateAuthor();
        navigate(-1);
    };

    return (
        <div>
            <h1>Edit Author</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={author.name} onChange={handleChange} required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={formatDate(author.dateOfBirth)} onChange={handleChange} required />
                </label>
                <label>
                    Country of Origin:
                    <input type="text" name="countryOfOrigin" value={author.countryOfOrigin} onChange={handleChange} required />
                </label>
                <label>
                    Short Description:
                    <textarea name="shortDescription" value={author.shortDescription} onChange={handleChange} required />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditAuthor;
