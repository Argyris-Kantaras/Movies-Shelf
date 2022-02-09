import { useEffect, useState } from "react";
import { state } from "../../App";
import ShowPopularActors from "./ShowPopularActors";
import styles from "./popularActors.module.css";

function PopularActors() {
  const [triggered, setTrigger] = useState(false);
  const [popularActors, setPopularActors] = useState([]);

  useEffect(() => {
    const getPopularActorsId = async function () {
      const res = await fetch(
        "https://imdb8.p.rapidapi.com/actors/list-most-popular-celebs?homeCountry=US&currentCountry=US&purchaseCountry=US",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key":
              "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
          },
        }
      );
      const data = res.ok ? await res.json() : undefined;
      console.log(data);
      const first6 = data.slice(12, 15);
      const finalIds = [];
      first6.map((id) => {
        const cleanId = id.slice(6, -1);
        finalIds.push(cleanId);
      });
      const getActorsDetails = async function (id) {
        const res = await fetch(
          `https://data-imdb1.p.rapidapi.com/actor/id/${id}/`,
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
        const collectData = function () {
          const dataObj = {
            name: results.results.name,
            image: results.results.image_url,
            id: results.results.imdb_id,
          };
          state.popularActors.push(dataObj);
        };
        collectData();
        setTrigger(true);
      };
      if (triggered) {
        setPopularActors(state.popularActors);
      }

      finalIds.forEach((id) => {
        getActorsDetails(id);
      });
      state.popularActors = [];
    };
    // getPopularActorsId();
  }, [triggered]);

  return (
    <div className={styles.actorsMainContainer}>
      <h2 className={styles.title}>Popular Actors</h2>
      <ShowPopularActors data={popularActors} />
    </div>
  );
}

export default PopularActors;
