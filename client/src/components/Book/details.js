import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GoBack from '../goBack';

function BookDetails() {
    const { authorId, bookId } = useParams();
    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        const getBookDetails = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}`);
            const body = await response.json();
            console.log(body);
            setBookDetails(body);
        };

        console.log(bookId);

        getBookDetails();
        console.log(bookDetails);
    }, [authorId, bookId]);

    return (
        <div>
            <h1>Name: {bookDetails.name}</h1>
            <p>Dare of publication: {bookDetails.dateOfPublication}</p>
            <p>Number of sales: {bookDetails.numberOfSales}</p>
            <h2>Reviews</h2>:
            <ul>
                {bookDetails.reviews && bookDetails.reviews.map(review => (
                    <li key={review._id}>
                        <p>Review: {review.review}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Up votes: {review.upVotes}</p>
                    </li>
                ))}
            </ul>
            <GoBack />
        </div>
    );
}

export default BookDetails;
