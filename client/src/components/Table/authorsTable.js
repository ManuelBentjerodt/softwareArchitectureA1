import React, { useState, useEffect, useMemo } from 'react'
import Table from './table';


function AuthorsTable() {
    const [authors, setAuthors] = useState([]);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const columnsMemo = useMemo(() => columns, [columns]);
    const dataMemo = useMemo(() => data, [data]);

    useEffect(() => {
        const getAllAuthors = async () => {
            const response = await fetch('/api/authors/all');
            const body = await response.json();

            const fetchedAuthors = body.rows.map(row => row.doc);

            setColumns([
                {
                    Header: 'Name',
                    accessor: 'col1',
                },
                {
                    Header: 'Number of published books',
                    accessor: 'col2',
                },
                {
                    Header: 'Avarage score',
                    accessor: 'col3',
                },
                {
                    Header: 'Total sales',
                    accessor: 'col4',
                }
            ]);

            const authorsData = fetchedAuthors.map(author => {
                const averageRating = author.books.reduce((acc1, book) => {
                    const { sum, count } = book.reviews.reduce((acc2, review) => {
                        return { sum: acc2.sum + review.rating, count: acc2.count + 1 };
                    }, { sum: 0, count: 0 });

                    return { sum: acc1.sum + sum, count: acc1.count + count };
                }, { sum: 0, count: 0 });

                const finalAverageRating = averageRating.count > 0 ? averageRating.sum / averageRating.count : 1;


                return {
                    col1: author.name,
                    col2: author.books.length,
                    col3: finalAverageRating.toFixed(2),
                    col4: author.books.reduce((acc, book) => acc + book.numberOfSales, 0),
                }
            });

            setData(authorsData);
            setAuthors(fetchedAuthors);
        };

        getAllAuthors();
    }, []);


    return (
        <div>
            <Table columns={columnsMemo} data={dataMemo} />
        </div>
    );
}

export default AuthorsTable;
