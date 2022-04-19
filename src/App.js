import { useEffect, useState } from "react";

import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = "http://www.omdbapi.com?apikey=527d76df";

const App = () => {

  const [searchTerm, setSearchTerm ] = useState('');
  const [movies, setMovies] = useState([]);

  // useEffect() accepte un tableau de dépendences vides
  // nous voulons l'appelr qu'au début
  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
           onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        ) :
        (
          <div className="empty">
            <h2>No movies Found</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
