import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendingCards from "./TrendingCards";
import Loading from "../Loading";
import TopNav from "./TopNav";
const Popular = () => {
  document.title = "AMDB | Popular";

  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      // settrending(data.results);
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className=" w-screen h-screen pt-5">
      <div className="w-full flex items-center">
        <i
          onClick={() => navigate(-1)}
          class="text-2xl px-2 text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl font-semibold text-zinc-400 mr-[15%]">
          Popular
        </h1>
        <TopNav />
        <div className="pr-[2%]">
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        loader={<h1>loading....</h1>}
        hasMore={hasMore}
        className="bg-[#1F1E24]"
      >
        <TrendingCards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
