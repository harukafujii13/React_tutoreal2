import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); //null because initially not error

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    //loadしたらすぐにfetchされる
    fetchMovieHandler();
  }, [fetchMovieHandler]); //only excuted again is the dependencies listed here change

  let content = <p>Found no movie.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

//<section>
// {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
// {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
// {!isLoading && error && <p>{error}</p>}
// {isLoading && <p>Loading...</p>}
// </section>

//memo1
//The useEffect hook is used to call the fetchMovieHandler function
//when the component mounts. The fetchMovieHandler function is passed as a dependency
//to useEffect so that it will only be executed again if the fetchMovieHandler function changes.

//memo2
//The fetchMovieHandler function is a callback function that fetches the movies from the API.
//It sets the isLoading state to true before making the fetch request, and sets it back to false
//after the fetch is complete. If an error occurs during the fetch, it sets the error state with the error message.
//It also maps the fetched movie data to a transformedMovies array with selected movie properties,
//and sets the movies state with the transformedMovies.

//*
//useEffect: The useEffect hook is used to manage side effects, such as data fetching, subscriptions, or DOM manipulation,
//in functional components. It allows you to perform side effects after the component has rendered,
//and optionally clean up those side effects when the component unmounts or when specific dependencies change.
//It helps you separate concerns and keep your components focused on rendering UI, while encapsulating side effects in a separate function.
//This can help avoid issues like memory leaks or stale data.
