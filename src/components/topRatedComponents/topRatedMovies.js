import { useEffect, useState } from "react";
import { state } from "../../App";
import ShowTopRated from "./ShowTopRated";
import styles from "./topRatedMovies.module.css";

const ids = [];

function TopRatedMovies() {
  const [topRatedData, setTopRatedData] = useState([]);
  const [triggered, setTrigger] = useState(false);

  useEffect(() => {
    const getPopularIds = async function () {
      const res = await fetch(
        "https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/?page_size=50",
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
      data.results.forEach((movie) => {
        const dataObj = {
          id: movie.imdb_id,
          title: movie.title,
        };
        ids.push(dataObj);
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
        state.topRated = [];
      }
      ids.forEach((movie) => {
        getPopularResults(movie.id);
      });
    };

    getPopularIds();
  }, [triggered]);

  return (
    <div className={styles.allTopRatedMoviesContainer}>
      <h2 className={styles.title}>Top Rated Movies</h2>
      <ShowTopRated data={topRatedData} />
    </div>
  );
}

export default TopRatedMovies;
