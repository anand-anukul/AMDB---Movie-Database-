import React, { useEffect, useState } from "react";
import Sidenav from "./template/Sidenav";
import TopNav from "./template/TopNav";
import axios from "../utils/axios";
import Header from "./template/Header";
import HorizontalCards from "./template/HorizontalCards";
import Dropdown from "./template/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "AMDB | Homepage";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState();
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(trending);
  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full ">
        <TopNav />
        <Header data={wallpaper} />

        <div className="mb- flex justify-between mt-2">
          <h1 className="text-3xl font-semibold text-zinc-400 ml-2">Trending</h1>
          <Dropdown title="Filter" options={["movies", "tv", "all"]} func={(e)=>setcategory(e.target.value)}/>
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
