import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowUpcoming from "./ShowUpcoming";
import styles from "./upcoming.module.css";
import { state } from "../../App";

const convertData = function (data) {
  const dataObj = {
    banner: data.banner,
    image: data.image_url,
    rate: data.rating,
    release: data.release,
    title: data.title,
    year: data.year,
    id: data.imdb,
  };
  return state.comingSoon.push(dataObj);
};

function Upcoming() {
  const [comingMovies, setComingMovies] = useState([]);
  const [triggered, setTrigger] = useState(false);

  useEffect(() => {
    const getUpcomingMovies = async function () {
      const res = await fetch(
        "https://imdb8.p.rapidapi.com/title/get-coming-soon-movies?homeCountry=US&purchaseCountry=US&currentCountry=US",
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
      const getUpcomingDetails = async function (id) {
        const res = await fetch(
          "https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=tt12825632",
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
        // fetch(
        //   `https://data-imdb1.p.rapidapi.com/movie/id/tt12825632/`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        //       "x-rapidapi-key":
        //         "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
        //     },
        //   }
        // );
        const results = res.ok ? await res.json() : undefined;
        convertData(results.results);
        setTrigger(true);
      };

      if (triggered) {
        setComingMovies(state.comingSoon);
        state.comingSoon = [];
      }

      data.forEach((movie) => {
        console.log(movie.id);
        const id = movie.id.slice(7);
        // getUpcomingDetails(id);
      });
      getUpcomingDetails();
    };
    console.log(state.comingSoon);
    getUpcomingMovies();
  }, [triggered]);

  return (
    <div className={styles.upcomingContainer}>
      <h3>Upcoming movies/series</h3>
      <ShowUpcoming data={comingMovies} />
    </div>
  );
}

export default Upcoming;
