import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorIndex from './components/Author/index';
import AuthorDetails from './components/Author/details';
import CreateAuthor from './components/Author/create';
import EditAuthor from './components/Author/edit';
import BookDetails from './components/Book/details';
import CreateBook from './components/Book/create';
import CreateReview from './components/Review/create';
import GoBack from './components/goBack';
import Index from './components/index';
import AuthorsTable from './components/Table/authorsTable';
import TopRated from './components/Table/topRatedsTable';
import SearchWindows from './components/Table/searchWindows';
import EditBook from './components/Book/edit';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<AuthorIndex />} /> */}
        <Route path="/" element={<Index />} />
        <Route path="/authors/all" element={<AuthorIndex />} />
        <Route path="/authors/new" element={<CreateAuthor />} />
        <Route path="/authors/:authorId" element={<AuthorDetails />} />
        <Route path="/authors/:authorId/edit" element={<EditAuthor/>} />
        <Route path="/authors/:authorId/books/:bookId" element={<BookDetails />} />
        <Route path="/authors/:authorId/books/:bookId/edit" element={<EditBook />} />
        <Route path="/authors/:authorId/books/new" element={<CreateBook />} />
        <Route path="/authors/:authorId/books/:bookId/reviews/new" element={<CreateReview />} />

        <Route path="authorsTable" element={<AuthorsTable/>} />
        <Route path="/books/top" element={<TopRated />} />

        <Route path="/search" element={<SearchWindows />} />
        
      </Routes>
      <GoBack />
    </Router>
  );
}

export default App;
