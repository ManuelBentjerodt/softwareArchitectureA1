import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const CreateSale = () => {
    const navigate = useNavigate();
    const { authorId, bookId } = useParams();
    const [sale, setSale] = useState({
        _id: uuidv4(),
        year: '',
        sales: 0
    });


    const handleChange = e => {
        setSale({
            ...sale,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const createSale = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/sales/new`, {
                
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sale),
            });
            const body = await response.json();

        };
        createSale();
        navigate(-1);
    };

    return (
        <div>
            <h1>Create sale</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input type="number" name="year" value={sale.year} onChange={handleChange} required />
                </label>
                <label>
                    Sale:
                    <input type="number" name="sales" value={sale.sales} onChange={handleChange} required />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateSale;
