import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorIndex from './components/Author/index';
import AuthorDetails from './components/Author/details';
import CreateAuthor from './components/Author/create';
import BookDetails from './components/Book/details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthorIndex />} />
        <Route path="/authors/new" element={<CreateAuthor />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
        <Route path="/authors/:authorId/books/:bookId" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
