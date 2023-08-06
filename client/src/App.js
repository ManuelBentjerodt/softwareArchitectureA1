import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorIndex from './components/Author/index';
import AuthorDetails from './components/Author/details';
import CreateAuthor from './components/Author/create';
import BookDetails from './components/Book/details';
import CreateBook from './components/Book/create';
import CreateReview from './components/Review/create';
import GoBack from './components/goBack';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthorIndex />} />
        <Route path="/authors/new" element={<CreateAuthor />} />
        <Route path="/authors/:authorId" element={<AuthorDetails />} />
        <Route path="/authors/:authorId/books/:bookId" element={<BookDetails />} />
        <Route path="/authors/:authorId/books/new" element={<CreateBook />} />
        <Route path="/authors/:authorId/books/:bookId/reviews/new" element={<CreateReview />} />
      </Routes>
      <GoBack />
    </Router>
  );
}

export default App;
