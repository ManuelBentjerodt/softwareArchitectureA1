import React, { useState, useEffect } from 'react'

function TopRated() {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const getTopRated = async () => {
            const response = await fetch('/api/books/all');
            const body = await response.json();
            const booksWithAverageRating = body.map(book => {
                const totalReviews = book.reviews.length;
                const totalRating = book.reviews.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / totalReviews || 0;
                const bestReview = book.reviews.reduce((best, review) => review.rating > best.rating ? review : best, { rating: -1 });
                const worstReview = book.reviews.reduce((worst, review) => review.rating < worst.rating ? review : worst, { rating: 11 });
                const mostUpvotedReview = book.reviews.reduce((mostUpvoted, review) => review.upVotes > mostUpvoted.upVotes ? review : mostUpvoted, { upVotes: -1 });

                return {
                    ...book,
                    averageRating,
                    bestReview,
                    worstReview,
                    mostUpvotedReview
                };
            });
            booksWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);
            const top10RatedBooks = booksWithAverageRating.slice(0, 10);
            setBooks(top10RatedBooks);
        };
        getTopRated();
    }, []);

    return (
        <div>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        <h2>{book.name}</h2>
                        <p>Publication date: {book.dateOfPublication}</p>
                        <p>Average Rating: {book.averageRating.toFixed(2)}/5</p>
                        <p>Highest Review: {book.bestReview.review} {book.bestReview.rating}/5</p>
                        <p>Lowest Review: {book.worstReview.review} {book.worstReview.rating}/5</p>
                        <p>Most popular Review: {book.mostUpvotedReview.review}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopRated;