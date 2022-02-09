import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./displayActorsDetails.module.css";

function DisplayActorsdetails() {
  const [actorsDetails, setActorsDetails] = useState({});
  const [knownFor, setKnownFor] = useState([]);

  useEffect(() => {
    const getActorsPartialDetails = async function () {
      const res = await fetch(
        "https://data-imdb1.p.rapidapi.com/actor/id/nm4689420/",
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
      const dataObj = {
        birth: data.results.birth_date,
        placeOfBirth: data.results.birth_place,
        image: data.results.image_url,
        id: data.results.imdb_id,
        name: data.results.name,
        partialBio: data.results.partial_bio,
      };
      setActorsDetails(dataObj);
    };
    const getMoviesKnownFor = async function () {
      const res = await fetch(
        "https://data-imdb1.p.rapidapi.com/actor/id/nm4689420/movies_knownFor/?page_size=50",
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
      const collectData = function (data) {
        const allKnownForResults = [];
        data.forEach((movie) => {
          const dataObj = {
            id: movie[0].imdb_id,
            rate: movie[0].rating,
            title: movie[0].title,
            role: movie[1].map((details) => {
              return details.role;
            }),
          };
          allKnownForResults.push(dataObj);
        });
        setKnownFor(allKnownForResults);
      };
      collectData(data.results);
    };
    getActorsPartialDetails();
    getMoviesKnownFor();
  }, []);

  return (
    <div>
      <div className={styles.mainDetaisContainer}>
        <h2 className={styles.name}>{actorsDetails.name}</h2>
        <img alt="" src={actorsDetails.image} />
        <p>
          Born in: {actorsDetails.birth} at {actorsDetails.placeOfBirth}
        </p>
        <p>{actorsDetails.partialBio}</p>
      </div>
      <div className={styles.knownForContainer}>
        <span className={styles.topText}>Known For:</span>
        {knownFor.map((movie) => {
          return (
            <Link
              className={styles.knownForResults}
              key={movie.id}
              to={`/current-movie/${movie.id}`}
            >
              <div>
                <h4 className={styles.movieTitle}>{movie.title}</h4>
                <p>Role: {movie.role[0]}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayActorsdetails;
