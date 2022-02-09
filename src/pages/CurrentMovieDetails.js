import { useEffect, useState } from "react";
import styles from "./currentMovieDetails.module.css";
import star from "../icons/star.png";
import awardIcon from "../icons/award.png";
import GenreComponent from "../components/genresComponents/GenreComponent";
import runtime from "../icons/time.png";
import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner";
import ErrorMessage from "../handleErrors/ErrorMessage";

let currentObj = {};
let idInd = "";

const collectDetails = function (data) {
  const allDetails = {
    actors: data.Actors,
    awards: data.Awards,
    boxOffice: data.BoxOffice,
    country: data.Country,
    director: data.Director,
    genre: data.Genre,
    Laguage: data.Language,
    plot: data.Plot,
    poster: data.Poster,
    rates: data.Ratings,
    released: data.Released,
    runtime: data.Runtime,
    title: data.Title,
    type: data.Type,
    site: data.Website,
    writer: data.Writer,
    year: data.Year,
    imdbRate: data.imdbRating,
    imdbVotes: data.imdbVotes,
    id: data.imdbID,
  };
  currentObj = allDetails;
  console.log(currentObj);
};

function CurrentMovieDetails() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState();
  const [videoID, setVideoID] = useState("");
  const id = useParams();

  useEffect(() => {
    const getDetails = async function (identity) {
      try {
        console.log(id);
        const res = await fetch(
          `https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=${identity.id}`,
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
        collectDetails(data);
        setDetails(currentObj);
        setLoading(false);
      } catch (error) {
        return <ErrorMessage err={error} />;
      }
    };

    getDetails(id);
  }, []);

  useEffect(() => {
    const getTrailerID = async function (identity) {
      try {
        const res = await fetch(
          `https://imdb8.p.rapidapi.com/title/get-videos?tconst=${identity.id}&limit=25&region=US`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "imdb8.p.rapidapi.com",
              "x-rapidapi-key":
                "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        //data.resource.videos[0].id
        const trailerID = data.resource.videos[0].id;
        console.log(trailerID.slice(9));
        setVideoID(trailerID.slice(9));
      } catch (error) {
        return <ErrorMessage err={error} />;
      }
    };
    getTrailerID(id);
  }, [id]);

  useEffect(() => {
    const getTrailer = async function (trailerID) {
      try {
        const res = await fetch(
          `https://imdb8.p.rapidapi.com/title/get-video-playback?viconst=${trailerID}&region=US`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "imdb8.p.rapidapi.com",
              "x-rapidapi-key":
                "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
            },
          }
        );
        const data = await res.json();
        const trailer = data.resource.encodings[1].playUrl;
        setTrailer(trailer);
      } catch (error) {
        return <ErrorMessage err={error} />;
      }
    };
    getTrailer(videoID);
  }, [videoID]);
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.allDetailsContainer}>
        <div className={styles.detailsTopBar}>
          <h2 className={styles.title}>{details.title}</h2>
          <p className={styles.rate}>
            <img className={styles.starIcon} src={star} />{" "}
            <span className={styles.justRate}>{details.imdbRate}</span>
            /10 <br /> {details.imdbVotes} votes
          </p>
          {/* <p className={styles.type}>type: '{details.type}'</p> */}
        </div>
        <div className={styles.mediaContainer}>
          <div className={styles.poster}>
            <img className={styles.img} alt="poster" src={details.poster} />
          </div>
          <iframe
            className={styles.trailer}
            src={trailer}
            width="400"
            height="300"
          ></iframe>
        </div>
        <GenreComponent genres={details.genre} />
        <p className={styles.released}>Released: {details.released}</p>
        <div className={styles.detailsContainer}>
          <h3 className={styles.plotText}>PLOT:</h3>
          <p className={styles.plot}>{details.plot}</p>
          <div className={styles.section1}>
            <p className={styles.actors}>
              <span className={styles.infoText}>Stars:</span>
              <em className={styles.onlyActors}>{details.actors}</em>
            </p>
            <p className={styles.writer}>
              <span className={styles.infoText}>Writer/s:</span>{" "}
              <em>{details.writer}</em>
            </p>
            <p className={styles.director}>
              <span className={styles.infoText}>Director/s:</span>{" "}
              <em>{details.director}</em>
            </p>
          </div>

          <div className={styles.section2}>
            <p className={styles.runtime}>
              <img className={styles.timeIcon} alt="clock" src={runtime} />{" "}
              {details.runtime}
            </p>
            <p className={styles.awards}>
              <img className={styles.awardIcon} src={awardIcon} />{" "}
              {details.awards}
            </p>
            <p className={styles.boxOffice}>
              <span className={styles.infoText}>BoxOffice:</span>{" "}
              {details.boxOffice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentMovieDetails;
