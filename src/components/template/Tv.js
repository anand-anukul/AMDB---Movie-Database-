
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendingCards from "./TrendingCards";
import Loading from "../Loading";
import TopNav from "./TopNav";

const Tv = () => {
  document.title = "AMDB | TV";

  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      // settrending(data.results);
      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
        GetTv();
    } else {
      setpage(1);
      settv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className=" w-screen h-screen pt-5">
      <div className="w-full flex items-center">
        <i
          onClick={() => navigate(-1)}
          class="text-2xl px-2 text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl font-semibold text-zinc-400 mr-[15%]">
          TV
        </h1>
        <TopNav />
        <div className="pr-[2%]">
          <Dropdown
            title="Category"
            options={["on_the_air", "top_rated", "popular", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        loader={<h1>loading....</h1>}
        hasMore={hasMore}
        className="bg-[#1F1E24]"
      >
        <TrendingCards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tv;
