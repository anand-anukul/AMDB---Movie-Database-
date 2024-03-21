import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import TrendingCards from "./TrendingCards";
import Loading from "../Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const NowPlaying = () => {

  document.title= "AMDB | Trending"
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [trending, settrending] = useState([]);
  const [duration, setduration] = useState("day");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      // settrending(data.results);
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" w-screen h-screen pt-5">
      <div className="w-full flex items-center">
        <i
          onClick={() => navigate(-1)}
          class="text-2xl px-2 text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl font-semibold text-zinc-400 mr-[15%]">
          Trending
        </h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setcategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setduration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        loader={<h1>loading....</h1>}
        hasMore={hasMore}
        className="bg-[#1F1E24]"
      >
        <TrendingCards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default NowPlaying;
