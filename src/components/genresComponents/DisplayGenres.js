import { useEffect, useRef, useState } from "react";
import { state } from "../../App";
import DisplayGenreResults from "./DisplayGenreresults";
import styles from "./displayGenres.module.css";

function DisplayGenres() {
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("");
  const [finalResults, setFinalResults] = useState([]);
  const [triggered, setTrigger] = useState(false);
  const genreResultsRef = useRef();
  const genreBtnRef = useRef();

  useEffect(() => {
    try {
      const getGenres = async function () {
        const res = await fetch("https://data-imdb1.p.rapidapi.com/genres/", {
          method: "GET",
          headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key":
              "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
          },
        });
        const data = res.ok ? await res.json() : undefined;
        setGenres(data.results);
      };
      getGenres();
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useEffect(() => {
    const getGenreResults = async function (genre) {
      const res = await fetch(
        `https://data-imdb1.p.rapidapi.com/movie/byGen/${genre}/?page_size=50`,
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
      const genresDetails = async function (id) {
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
        const results = res.ok ? await res.json() : undefined;
        const postersObj = {
          poster: results.results.image_url,
          id: results.results.imdb_id,
          title: results.results.title,
        };
        const addResults = function () {
          state.allPosters.push(postersObj);
        };
        setTrigger(true);
        addResults();
      };
      if (triggered) {
        setFinalResults(state.allPosters);
        state.allPosters = [];
      }

      data.results.forEach((movie) => {
        genresDetails(movie.imdb_id);
      });
    };
    if (currentGenre !== "") getGenreResults(currentGenre);
  }, [currentGenre, triggered]);

  const getGenreFromUI = function (e) {
    setCurrentGenre(e.target.id);
    genreResultsRef.current.style.display = "block";
  };

  const closeResults = function () {
    genreResultsRef.current.style.display = "none";
  };

  return (
    <div className={styles.genresContainer}>
      <h2 className={styles.title}>Pick up your genre </h2>

      {genres.map((type) => {
        return (
          <button
            ref={genreBtnRef}
            onClick={getGenreFromUI}
            className={styles.genreBtn}
            id={type.genre}
            key={type.genre}
          >
            {type.genre}
          </button>
        );
      })}
      <div className={styles.genreResultsContainer} ref={genreResultsRef}>
        <button onClick={closeResults} className={styles.exitBtn}>
          X
        </button>
        <DisplayGenreResults data={finalResults} />
      </div>
    </div>
  );
}

export default DisplayGenres;
