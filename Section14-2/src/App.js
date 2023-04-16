import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";
import { xRapidAPIKey } from "./config/index";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(xRapidAPIKey);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(xRapidAPIKey, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

//memo1
//JSON.stringify(movie), which converts the movie object into a JSON string,
//as the request payload to send to the server.

//memo2
//The headers property of the options object is set to specify the "Content-Type" header as "application/json",
//indicating that the request payload is in JSON format.

//memo3
//Some common examples of HTTP headers include:
//・Content-Type: Specifies the type of content being sent or received, such as "application/json"
// for JSON data or "text/html" for HTML content.

//・Content-Length: Indicates the length of the content
// in the request or response body in bytes.

//・Authorization: Contains credentials or tokens used for authentication or authorization purposes.

//・Cache-Control: Specifies caching instructions for the request or response, such
//  as "no-cache" to indicate that the response should not be cached.

//・User-Agent: Contains information about the client making the request, such as the type of browser or device being used.

//Headers are important for communication between clients (such as web browsers) and servers,
//as they provide additional information about the request or response, allowing for more effective
//communication and handling of the exchanged data.
