import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../handleErrors/ErrorMessage";
import styles from "./getSearchResults.module.css";
import Spinner from "../Spinner";
import { state } from "../../App";
let pageCount = 1;
function GetSearchResults(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const nextPage = function () {
    pageCount++;
    setPage(pageCount);
    console.log(page);
  };
  const previousPage = function () {
    if (pageCount > 1) {
      pageCount--;
    }
    setPage(pageCount);
    console.log(page);
  };

  useEffect(() => {
    const getMovieID = async function (query, pageNum) {
      try {
        const res = await // fetch(
        //   `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${query}/`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        //       "x-rapidapi-key":
        //         "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
        //     },
        //   }
        // );
        fetch(
          `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${query}&r=json&page=${pageNum}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host":
                "movie-database-imdb-alternative.p.rapidapi.com",
              "x-rapidapi-key":
                "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
            },
          }
        );
        const data = await res.json();
        console.log(data);

        if (data.Error) {
          console.log(data.Error);
          throw new Error(data.Error);
        }
        setSearchResults(data.Search);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (props.location !== "") {
      getMovieID(props.location, page);
    }
  }, [props.location, page]);

  if (loading) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }

  return (
    <div className={styles.allResultsContainer}>
      <button onClick={props.hideHandler} className={styles.exitBtn}>
        X
      </button>
      {searchResults.map((movie) => {
        return (
          <Link
            key={movie.imdbID}
            className={styles.link}
            to={`/current-movie/${movie.imdbID}`}
          >
            <div className={styles.result} id={movie.imdb_id}>
              <h2 className={styles.title}>{movie.Title}</h2>
              <img
                className={styles.img}
                id={movie.imdbID}
                src={movie.Poster}
              />

              <p>{movie.Year}</p>
            </div>
          </Link>
        );
      })}
      <button onClick={previousPage} className={styles.prevBtn}>
        Previous
      </button>
      <button onClick={nextPage} className={styles.nextBtn}>
        next
      </button>
    </div>
  );
}

export default GetSearchResults;
