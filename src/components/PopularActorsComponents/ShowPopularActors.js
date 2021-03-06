import { useEffect, useState } from "react";
import styles from "./showPopularActors.module.css";

function ShowPopularActors(props) {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    setActors(props.data);
  }, [props.data]);

  return (
    <div>
      {actors.map((actor) => {
        return (
          <div key={actor.id} className={styles.actorsContainer}>
            <h4>{actor.name}</h4>
            <img className={styles.img} alt="" src={actor.image} />
          </div>
        );
      })}
    </div>
  );
}

export default ShowPopularActors;
