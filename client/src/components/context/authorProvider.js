import React, { useState } from 'react';
import AuthorContext from './authorContext';

const AuthorProvider = ({ children }) => {
    const [authorDetails, setAuthorDetails] = useState({});

    const addBook = (book) => {
        setAuthorDetails(prevDetails => ({
            ...prevDetails,
            books: [...prevDetails.books, book]
        }));
    };

    return (
        <AuthorContext.Provider value={{ authorDetails, setAuthorDetails, addBook }}>
            {children}
        </AuthorContext.Provider>
    );
};

export default AuthorProvider;
