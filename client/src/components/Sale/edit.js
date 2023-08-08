import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const EditSale = () => {
    const navigate = useNavigate(); 
    const { authorId, bookId, saleId } = useParams();
    const [sale, setSale] = useState({
        _id: uuidv4(),
        year: '',
        sales: 0
    });

    useEffect(() => {
        const fetchSale = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/sales/${saleId}`);
            const data = await response.json();
            console.log(data);
            setSale(data);
        }
        fetchSale();
    }, [authorId, bookId, saleId]);

    const handleChange = e => {
        setSale({
            ...sale,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const editSale = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/sales/${saleId}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sale),
            });
            const body = await response.json();

        };
        editSale();
        navigate(-1);
    };

    return (
        <div>
            <h1>Edit sale</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input type="number" name="year" value={sale.year} onChange={handleChange} required />
                </label>
                <label>
                    Sale:
                    <input type="number" name="sales" value={sale.sales} onChange={handleChange} required />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditSale;
