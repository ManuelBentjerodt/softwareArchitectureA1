import React, { useState, useEffect, useMemo } from 'react';
import Table from './table';

function generateTop5SalesForYear(authors, year) {
    const salesDataForYear = [];

    // Populate the salesDataForYear
    authors.forEach(author => {
        author.books.forEach(book => {
            const publicationYear = new Date(book.dateOfPublication).getFullYear();
            if (publicationYear === year) {
                salesDataForYear.push(...book.salesPerYear);
            }
        });
    });

    // Sort and return the top 5 sales for the year
    return salesDataForYear
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
}

function TopBooksTable() {
    const [topBooks, setTopBooks] = useState([]);
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
                    Header: 'Title',
                    accessor: 'col1',
                },
                {
                    Header: 'Total Sales',
                    accessor: 'col2',
                },
                {
                    Header: 'Author',
                    accessor: 'col3',
                },
                {
                    Header: "Author's total sales",
                    accessor: 'col4',
                    
                },
                {
                    Header: 'Top 5 on publication year',
                    accessor: 'col5',
                }
            ]);


            // Process top books from authors' data
            const topBooksData = fetchedAuthors.flatMap(author =>
                author.books.map(book => {
                    const publicationYear = new Date(book.dateOfPublication).getFullYear();
                    const salesInPublicationYear = book.salesPerYear.find(sale => sale.year === publicationYear)?.sales || 0;
                    const isTop5SalesYear = generateTop5SalesForYear(fetchedAuthors,publicationYear).some(sale => sale.bookId === book._id);
    
                    return {
                        author: author,
                        book: book,
                        publicationYear: publicationYear,
                        totalSales: book.salesPerYear.reduce((acc, year) => acc + year.sales, 0),
                        salesInPublicationYear: salesInPublicationYear,
                        isTop5SalesYear: isTop5SalesYear
                    };
                })
            )
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 50);
            const formattedTopBooks = topBooksData.map(item => {    
                return {
                    col1: item.book.name,
                    col2: item.totalSales,
                    col3: item.author.name,
                    col4: item.author.books.reduce((acc, book) => acc + book.salesPerYear.reduce((acc2, year) => acc2 + year.sales, 0), 0),
                    col5: item.isTop5SalesYear ? 'Yes' : 'No',
                };
            });

            setData(formattedTopBooks);
            setTopBooks(topBooksData);
        };

        getAllAuthors();
    }, []);

    return (
        <div>
            <Table columns={columnsMemo} data={dataMemo} />
        </div>
    );
}

export default TopBooksTable;
