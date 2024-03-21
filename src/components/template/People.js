import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendingCards from "./TrendingCards";
import Loading from "../Loading";
import TopNav from "./TopNav";

const People = () => {
  document.title = "AMDB | People";

  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`person/popular?page=${page}`);

      // settrending(data.results);
      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setpage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  
  return person.length > 0 ? (
    <div className=" w-screen h-screen pt-5">
      <div className="w-full flex items-center">
        <i
          onClick={() => navigate(-1)}
          class="text-2xl px-2 text-zinc-400 hover:text-[#6556CD] ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl font-semibold text-zinc-400 mr-[15%]">
          People
        </h1>
        <TopNav />
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        loader={<h1>loading....</h1>}
        hasMore={hasMore}
        className="bg-[#1F1E24]"
      >
        <TrendingCards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
