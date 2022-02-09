import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./showTopRated.module.css";

function ShowTopRated(props) {
  const [topData, setTopData] = useState([]);

  useEffect(() => {
    const restrictData = props.data.slice(0, 6);
    setTopData(restrictData);
  }, [props.data]);

  return (
    <div>
      {topData.map((movie) => {
        return (
          <Link
            key={movie.results.imdb_id}
            className={styles.link}
            to={`/current-movie/${movie.results.imdb_id}`}
          >
            <div className={styles.topRatedContainer}>
              <h4 className={styles.title}>{movie.results.title}</h4>
              <img className={styles.img} src={movie.results.image_url} />
              <p>
                <span className={styles.rateText}>{movie.results.rating}</span>
                /10
              </p>
              <p>Year:{movie.results.year}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ShowTopRated;
