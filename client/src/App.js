import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([])

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch('/api');
      const body = await response.json();
      setData(body);
    }

    fetchData();
    
  }, []);

  console.log(data);

  return (
    <div>
      {typeof data === "undefined" ? (
        <p> loading </p>
      ) : (
       <p> something</p>
      )}
    </div>
  )
}

export default App
