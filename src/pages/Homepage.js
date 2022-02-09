import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { state } from "../App";
import DisplayGenres from "../components/genresComponents/DisplayGenres";
import GetSearchResults from "../components/searchResultsComponent/GetSearchResults";
import Slider from "../components/sliderComponents/Slider";
import PopularActors from "../components/PopularActorsComponents/PopularActors";
import TopRatedMovies from "../components/topRatedComponents/topRatedMovies";
import Upcoming from "../components/upcomingComponent/Upcoming";
import styles from "./homepage.module.css";
import ActorsPage from "./ActorsPage";
import linkedInLogo from "../icons/linkedin-logo.png";
import facebookLogo from "../icons/facebook-logo.png";
import githubLogo from "../icons/github-logo.png";
import logo from "../icons/logo.png";
function Homepage() {
  const [query, setQuery] = useState("");
  const searchRef = useRef();
  const resultsRef = useRef();
  const slidesContainerRef = useRef();

  const hideResults = function () {
    state.query = "";
    resultsRef.current.style.display = "none";
    slidesContainerRef.current.style.display = "block";
  };

  useEffect(() => {
    setQuery(state.query);
    if (state.query !== "") {
      resultsRef.current.style.display = "block";
      slidesContainerRef.current.style.display = "none";
    }
  }, [state.query]);

  const getQuery = function (e) {
    e.preventDefault();
    state.query = searchRef.current.value;
    setQuery(searchRef.current.value);
    resultsRef.current.style.display = "block";
    searchRef.current.value = "";
    slidesContainerRef.current.style.display = "none";
  };

  return (
    <div className={styles.homeBody}>
      <header className={styles.header}>
        <img className={styles.mainLogo} alt="logo" src={logo} />
        <h1 className={styles.title}>Movies Shelf</h1>
        <form onSubmit={getQuery}>
          <input
            ref={searchRef}
            className={styles.searchInp}
            type="text"
            placeholder="Search Movies/Series"
          />
        </form>
        {/* <Link to="/actors-results">Actors</Link> */}
        <Link className={styles.link} to="/top-rated">
          100 top rated
        </Link>
      </header>
      <div ref={slidesContainerRef} className={styles.slidesContainer}>
        <Slider />
      </div>
      <div ref={resultsRef} className={styles.results}>
        <GetSearchResults location={query} hideHandler={hideResults} />
      </div>
      {/* <Upcoming /> */}
      <DisplayGenres />
      <TopRatedMovies />
      <PopularActors />
      <footer className={styles.foot}>
        <div>
          <h2 className={styles.copyright}>
            This app was designed and developed by Argyris Kantaras.
          </h2>
          <h4>Contact me</h4>
          <a href="https://www.linkedin.com/in/argyris-kantaras-291277219/">
            <img className={styles.logo} src={linkedInLogo} />
          </a>
          <a href="https://www.facebook.com/argyris.kantaras.3/">
            <img className={styles.logo} src={facebookLogo} />
          </a>
          <a href="https://github.com/Argyris-Kantaras">
            <img className={styles.logo} src={githubLogo} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
