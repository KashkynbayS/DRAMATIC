import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MovieGrid from '../components/movie-grid/MovieGrid';

const Search = () => {
  const { keyword } = useParams();

  return (
    <>
      <h2 style={{ marginTop: "150px" }} >Movies for search "{keyword}"</h2>
      <MovieGrid category="movie" />
      <h2>TV Series for search "{keyword}"</h2>
      <MovieGrid category="tv" />
      <h2>Actors for search "{keyword}"</h2>
      <MovieGrid category="person" />
      {/* <MovieGrid />   */}
    </>
  );
}

export default Search;
