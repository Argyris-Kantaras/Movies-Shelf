import "./App.css";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import CurrentMovieDetails from "./pages/CurrentMovieDetails";
import GetSearchResults from "./components/searchResultsComponent/GetSearchResults";
import ActorsPage from "./pages/ActorsPage";
import TopRatedPage from "./pages/TopRatedPage";
export const state = {
  query: "",
  id: "",
  generalData: [],
  topMoviesid: [],
  generalDetails: {},
  allPosters: [],
  topRated: [],
  comingSoon: [],
  popularActors: [],
  actorsResults: [],
  allActorsIds: [],
  topIds: [],
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/current-movie/:id" element={<CurrentMovieDetails />} />
        <Route path="/actors-results" element={<ActorsPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
      </Routes>
    </div>
  );
}

export default App;
