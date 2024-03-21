import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendingCards from "./TrendingCards";
import Loading from "../Loading";
import TopNav from "./TopNav";

const Movies = () => {
  document.title = "AMDB | Movies";

  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movies, setmovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      // settrending(data.results);
      if (data.results.length > 0) {
        setmovies((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (movies.length === 0) {
      GetMovies();
    } else {
      setpage(1);
      setmovies([]);
      GetMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movies.length > 0 ? (
    <div className=" w-screen h-screen pt-5">
      <div className="w-full flex items-center">
        <i
          onClick={() => navigate(-1)}
          class="text-2xl px-2 text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl font-semibold text-zinc-400 mr-[15%]">
          Movies
        </h1>
        <TopNav />
        <div className="pr-[2%]">
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={GetMovies}
        loader={<h1>loading....</h1>}
        hasMore={hasMore}
        className="bg-[#1F1E24]"
      >
        <TrendingCards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
