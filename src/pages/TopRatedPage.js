import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { state } from "../App";
import styles from "./topRatedPage.module.css";

function TopRatedPage() {
  const [topRatedData, setTopRatedData] = useState([]);
  const [triggered, setTrigger] = useState(false);

  useEffect(() => {
    const getPopularIds = async function () {
      const res = await fetch(
        "https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/?page_size=100",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key":
              "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
          },
        }
      );
      const data = res.ok ? await res.json() : undefined;
      console.log(data);
      data.results.forEach((movie) => {
        const dataObj = {
          id: movie.imdb_id,
          title: movie.title,
        };
        state.topIds.push(dataObj);
      });
      const getPopularResults = async function (id) {
        const res = await fetch(
          `https://data-imdb1.p.rapidapi.com/movie/id/${id}/`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
              "x-rapidapi-key":
                "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
            },
          }
        );
        const data = await res.json();
        const addDataToArray = function () {
          state.topRated.push(data);
        };
        setTrigger(true);
        addDataToArray();
      };
      if (triggered) {
        setTopRatedData(state.topRated);
      }

      state.topIds.forEach((movie) => {
        getPopularResults(movie.id);
      });
    };

    getPopularIds();
  }, [triggered]);

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>100 Top Rated Movies</h1>
      </header>
      {topRatedData.map((movie) => {
        return (
          <Link
            key={movie.results.imdb_id}
            className={styles.movieContainer}
            to={`/current-movie/${movie.results.imdb_id}`}
          >
            <h3 className={styles.title}>{movie.results.title}</h3>
            <img
              className={styles.img}
              alt="movie-pic"
              src={movie.results.banner}
            />
            <p>
              <span className={styles.rate}>{movie.results.rating}</span>/10
            </p>
            <p>{movie.results.release}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default TopRatedPage;
