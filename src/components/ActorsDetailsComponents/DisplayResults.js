import { useEffect, useState } from "react";

function DisplayResults(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(props.data);
  }, [props.data]);

  return (
    <div>
      {console.log(results)}
      {results.map((actor) => {
        return (
          <div key={actor.id}>
            <h3>{actor.name}</h3>
            <img alt="" src={actor.image} />
          </div>
        );
      })}
    </div>
  );
}

export default DisplayResults;
