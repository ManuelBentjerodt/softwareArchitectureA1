// AuthorDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AuthorDetails() {
    const { id } = useParams();
    const [authorDetails, setAuthorDetails] = useState({});

    useEffect(() => {
        const getAuthorDetails = async () => {
            const response = await fetch(`/api/authors/${id}`);
            const body = await response.json();
            console.log(body);

            setAuthorDetails(body);
        };

        getAuthorDetails();
    }, [id]);

    return (
        <div>

            <h1>{authorDetails.name}</h1>
            <p>{authorDetails.shortDescription}</p>
        </div>
    );
}

export default AuthorDetails;
