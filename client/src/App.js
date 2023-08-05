import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorIndex from './components/Author/index';
import AuthorDetails from './components/Author/details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthorIndex />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
