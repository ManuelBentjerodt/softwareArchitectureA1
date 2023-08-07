import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetails() {
    const { authorId, bookId } = useParams();
    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        const getBookDetails = async () => {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}`);
            const body = await response.json();
            setBookDetails(body);
            console.log(body)
        };
        getBookDetails();
        
    }, [authorId, bookId]);

    const handleDelete = async (reviewId) => {
        const response = await fetch(`/api/authors/${authorId}/books/${bookId}/reviews/${reviewId}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            // Si la eliminación fue exitosa, actualiza la lista de reviews
            setBookDetails({
                ...bookDetails,
                reviews: bookDetails.reviews.filter((review) => review._id !== reviewId),
            });
            
        } else {
            console.error('Error deleting review');
        }
    };
    

    return (
        <div>
            <h1>Name: {bookDetails.name}</h1>
            <p>Dare of publication: {bookDetails.dateOfPublication}</p>
            <p>Number of sales: {bookDetails.salesPerYear ? bookDetails.salesPerYear.reduce((total, yearSales) => total + yearSales.sales, 0) : 'Loading...'}</p>
            <h2>Reviews:</h2>
            <ul>
                {bookDetails.reviews && bookDetails.reviews.map(review => (
                    <li key={review._id}>
                        <p>Review: {review.review}</p>
                        <p>Rating: {review.score}</p>
                        <p>Up votes: {review.number_of_upvotes}</p>
                        <button onClick={() => handleDelete(review._id)}>Delete</button>
                    </li>
                ))}

            </ul>
            <Link to={`/authors/${authorId}/books/${bookId}/reviews/new`}>
                create review
            </Link>
        </div>
    );
}

export default BookDetails;
