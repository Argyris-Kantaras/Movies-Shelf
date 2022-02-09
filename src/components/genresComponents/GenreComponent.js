import { useEffect, useState } from "react";
import styles from "./genreComponent.module.css";

function GenreComponent(props) {
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    const splitGenres = async function () {
      const genresArray = await props.genres.split(",");
      setAllGenres(genresArray);
    };
    splitGenres();
  }, [props.genres]);

  return (
    <div className={styles.genreContainer}>
      {allGenres.map((genre) => {
        return (
          <span key={genre} className={styles.genres}>
            {genre}
          </span>
        );
      })}
    </div>
  );
}

export default GenreComponent;
