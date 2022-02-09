import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { state } from "../../App";
import Spinner from "../Spinner";
import DisplayResults from "./DisplayResults";

function DisplayActorsResults(props) {
  const [actorIds, setActorIds] = useState([]);
  const [results, setResults] = useState([]);
  const [triggered, setTrigger] = useState(false);

  useEffect(() => {
    const restrictIds = props.id.slice(0, 30);
    setActorIds(restrictIds);
  }, [props.id]);

  useEffect(() => {
    const getBasicDetails = async function (id) {
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
      const data = res.ok ? await res.json() : undefined;
      const collectData = function () {
        const dataObj = {
          placeOfBirth: data.results.birth_place,
          image: data.results.image_url,
          id: data.results.imdb_id,
          name: data.results.name,
        };
        state.actorsResults.push(dataObj);
      };
      setTrigger(true);
      collectData();
    };
    if (triggered) {
      setResults(state.actorsResults);
    }
    actorIds.forEach((id) => {
      getBasicDetails(id);
    });
    console.log(state.actorsResults);
  }, [actorIds, triggered]);

  return (
    <div>
      <DisplayResults data={results} />
    </div>
  );
}

export default DisplayActorsResults;
