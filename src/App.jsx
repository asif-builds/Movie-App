import { Navbar } from "./navbar/Navbar.jsx";
import { Hero } from "./Home/Home.jsx";
import { Movies } from "./Movies/Movies.jsx";
import { MovieDetails } from "./Movies/MovieDetails.jsx";
import { Tvshows } from "./Tv shows/Tvshows.jsx";
import { TvDetails } from "./Tv shows/TvDetails.jsx";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tvshows/:id" element={<TvDetails />} />
      </Routes>
    </div>
  );
}

export default App;
