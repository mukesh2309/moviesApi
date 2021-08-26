import React from "react";
import Movies from "./Movies";
import { useEffect, useState } from "react";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=2a4b2e56eeb6920f63ebf821dd5c2582&query=";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=2a4b2e56eeb6920f63ebf821dd5c2582&query=";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  },[]);

  

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
        fetch(SEARCH_API + searchTerm)
    .then((res) => res.json())
    .then((data) => {
      setMovies(data.results);
    });
    setSearchTerm('');
    }

};

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
        <input type="text" className = "search" value = {searchTerm} placeholder = "Search..." onChange={handleOnChange}/>
        </form>
      </header>
    <div className = "movie-container">
      {movies.length > 0 &&
        movies.map((movie) => <Movies key={movie.id} {...movie} />)
      }
    </div>
    </>
  );
};
export default App;