import React, { useState, useEffect, useMemo } from 'react'
import Table from './table';

function TopRated() {
    const [books, setBooks] = useState([]);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const columnsMemo = useMemo(() => columns, [columns]);
    const dataMemo = useMemo(() => data, [data]);
    
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
            const booksToColumns = top10RatedBooks.map(book => {
                return {
                    col0: (top10RatedBooks.indexOf(book) + 1).toString(),
                    col1: book.name,
                    col2: book.averageRating.toFixed(2) + '/5',
                    col3: book.bestReview.review + ' ' + book.bestReview.rating + '/5',
                    col4: book.worstReview.review + ' ' + book.worstReview.rating + '/5',
                    col5: book.mostUpvotedReview.review + ' ' + book.mostUpvotedReview.rating + '/5' 
                }
            });
            setColumns([
                {
                    Header: 'Position',
                    accessor: 'col0',
                },
                {
                    Header: 'Name',
                    accessor: 'col1',
                },
                {
                    Header: 'Average rating',
                    accessor: 'col2',
                },
                {
                    Header: 'Highest review',
                    accessor: 'col3',
                },
                {
                    Header: 'Lowest review',
                    accessor: 'col4',
                },
                {
                    Header: 'Most popular review',
                    accessor: 'col5',
                }
            ]);
            setData(booksToColumns);
            setBooks(body);
        };
        getTopRated();
    }, []);
    return (
        <div>
            <Table columns={columnsMemo} data={dataMemo} />
        </div>
    );
}


export default TopRated;