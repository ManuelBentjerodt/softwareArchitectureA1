import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetails() {
    const { authorId, bookId } = useParams();
    const [bookDetails, setBookDetails] = useState({});
    const [salesPerYearCollapsed, setSalesPerYearCollapsed] = useState(true);
    const toggleSalesPerYear = () => {
        setSalesPerYearCollapsed(!salesPerYearCollapsed);
    };

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
            setBookDetails({
                ...bookDetails,
                reviews: bookDetails.reviews.filter((review) => review._id !== reviewId),
            });

        } else {
            console.error('Error deleting review');
        }
    };

    const handleDeleteSale = async (saleId) => {
        try {
            const response = await fetch(`/api/authors/${authorId}/books/${bookId}/sales/${saleId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedBookDetails = { ...bookDetails };
                updatedBookDetails.salesPerYear = updatedBookDetails.salesPerYear.filter(sale => sale._id !== saleId);
                setBookDetails(updatedBookDetails);
            } else {
                console.error('Error deleting sale');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Name: {bookDetails.name}</h1>
            <p>Summary: {bookDetails.summary}</p>
            <p>Date of publication: {bookDetails.dateOfPublication}</p>
            <p>Total sales: {bookDetails.salesPerYear ? bookDetails.salesPerYear.reduce((total, yearSales) => total + parseInt(yearSales.sales), 0) : 'Loading...'}</p>
            <Link to={`/authors/${authorId}/books/${bookId}/edit`}>
                <button>
                    Edit book
                </button>
            </Link>
            <p onClick={toggleSalesPerYear} style={{ cursor: 'pointer' }}>
                Sales per year: {salesPerYearCollapsed ? '🔽' : '🔼'}
            </p>
            {salesPerYearCollapsed ? null : (
                <>
                <ul>
                    {bookDetails.salesPerYear && bookDetails.salesPerYear.map(sale => (
                        <li key={sale.year}>
                            <p>{sale.year} -{'->'} {sale.sales} sales.</p>
                            <Link to={`/authors/${authorId}/books/${bookId}/sales/${sale._id}/edit`}>
                                <button>
                                    Edit
                                </button>
                            </Link>
                            <button onClick={() => handleDeleteSale(sale._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <Link to={`/authors/${authorId}/books/${bookId}/sales/new`}>
                    Create sale
                </Link>
                </>
            )}
            
            <h2>Reviews:</h2>
            <ul>
                {bookDetails.reviews && bookDetails.reviews.map(review => (
                    <li key={review._id}>
                        <p>Review: {review.review}</p>
                        <p>Rating: {review.score}</p>
                        <p>Up votes: {review.number_of_upvotes}</p>
                        <Link to={`/authors/${authorId}/books/${bookId}/reviews/${review._id}/edit`}>
                            <button>
                                Edit
                            </button>
                        </Link>
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
