import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const CreateReview = () => {
    const navigate = useNavigate(); 
    const { authorId, bookId } = useParams();
    const [review, setReview] = useState({
        _id: uuidv4(),
        review: '',
        score: 1,
        number_of_upvotes: 0,
    });

    const handleChange = e => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(authorId);
        const createReview = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/reviews/new`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            const body = await response.json();
            console.log(body);
        };

        createReview();
        navigate(-1);
    };

    return (
        <div>
            <h1>Create Review</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Review:
                    <input type="text" name="review" value={review.review} onChange={handleChange} required />
                </label>
                <label>
                    Score:
                    <input type="number" name="score" min={1} max={5} value={review.score} onChange={handleChange} required />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateReview;
