import { useEffect, useState } from "react";
import styles from "./showUpcoming.module.css";

function ShowUpcoming(props) {
  const [comingData, setComingData] = useState([]);

  useEffect(() => {
    setComingData(props.data);
  }, [props.data]);

  return (
    <div>
      {comingData.map((movie) => {
        console.log(movie);
        return (
          <div className={styles.upcomingResult} key={movie.id}>
            <h4>{movie.title}</h4>
            <img className={styles.banner} alt="" src={movie.banner} />
          </div>
        );
      })}
    </div>
  );
}

export default ShowUpcoming;
