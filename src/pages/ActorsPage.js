import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DisplayActorsdetails from "../components/ActorsDetailsComponents/DisplayActorsDetails";
import DisplayActorsResults from "../components/ActorsDetailsComponents/DisplayActorsResults";
import styles from "./actorsPage.module.css";
import { state } from "../App";

function ActorsPage() {
  const searchRef = useRef();

  const [query, setQuery] = useState("");
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const getActorsId = async function (name) {
      try {
        const res = await fetch(
          `https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/${name}/`,
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
        data.results.forEach((actor) => {
          state.allActorsIds.push(actor.imdb_id);
        });
        setIds(state.allActorsIds);
      } catch (error) {
        console.error(error);
      }
    };
    if (query !== "") {
      getActorsId(query);
    }
  }, [query]);

  const getQuery = function (e) {
    e.preventDefault();
    // state.allActorsIds = [];
    setQuery("");
    setQuery(searchRef.current.value);
    searchRef.current.value = "";
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Movies Shelve</h1>
        <form onSubmit={getQuery}>
          <input
            ref={searchRef}
            className={styles.searchInp}
            type="text"
            placeholder="Search Actors/Actresses"
          />
        </form>
      </header>
      <div>
        <DisplayActorsResults id={ids} />
        {/* <DisplayActorsdetails /> */}
      </div>
    </div>
  );
}

export default ActorsPage;

//nm4689420
