import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const EditReview = () => {
    const navigate = useNavigate(); 
    const { authorId, bookId, reviewId } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/reviews/${reviewId}`);
            const data = await response.json();
            setReview(data);
        }
        fetchReview();
    }, [authorId, bookId, reviewId]);

    const handleChange = e => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const updateReview = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/reviews/${reviewId}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            const body = await response.json();
        };
        updateReview();
        navigate(-1);
    };

    if (!review) return null;  // si la review no se ha cargado todavía, no renderizar nada

    return (
        <div>
            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Review:
                    <input type="text" name="review" value={review.review} onChange={handleChange} required />
                </label>
                <label>
                    Score:
                    <input type="number" name="score" min={1} max={5} value={review.score} onChange={handleChange} required />
                </label>
                <label>
                    Number of Upvotes:
                    <input type="number" name="number_of_upvotes" value={review.number_of_upvotes} onChange={handleChange} required />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditReview;
