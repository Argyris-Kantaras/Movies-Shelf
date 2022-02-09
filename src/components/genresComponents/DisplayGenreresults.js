import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import styles from "./displayGenreResults.module.css";

function DisplayGenreResults(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reset = function () {
      setLoading(false);
    };

    reset();
  }, [props.data]);

  if (loading) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }

  return (
    <div>
      {props.data.map((img) => {
        return (
          <Link
            key={img.id}
            className={styles.link}
            to={`/current-movie/${img.id}`}
          >
            <div className={styles.resultsContainer}>
              <img className={styles.poster} alt="img" src={img.poster} />
              <h4 className={styles.title}>{img.title}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export default DisplayGenreResults;
