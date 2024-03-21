import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import NowPlaying from "./components/template/NowPlaying";
import Popular from "./components/template/Popular";
import Movies from "./components/template/Movies";
import Tv from "./components/template/Tv";
import People from "./components/template/People";
import MovieInfo from "./components/MovieInfo";
import TvInfo from "./components/TvInfo";
import PeopleInfo from "./components/PeopleInfo";
import Trailer from "./components/template/Trailer";
import NotFound from "./components/notFound";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nowplaying" element={<NowPlaying />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieInfo />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvInfo />} >
          <Route path="/tv/details/:id/trailer" element={<Trailer/>}/>
        </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PeopleInfo />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
