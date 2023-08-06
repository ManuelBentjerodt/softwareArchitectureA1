import React from 'react'

function Populate() {

    const handler = async () => {
        try {
            const response = await fetch('/api/populate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error('Error adding new author', error);
        }
    }
    return (

        <div>
            <button onClick={handler}>
                populate
            </button>
        </div>
    )
}

export default Populate