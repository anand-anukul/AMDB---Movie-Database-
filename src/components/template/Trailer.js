import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../notFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideos = useSelector((store) => store[category].info.videos);

  return (
    <div className="absolute z-100 top-0 left-0 h-screen w-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
      <Link
        onClick={() => navigate(-1)}
        class="absolute text-2xl px-2 text-zinc-200 hover:text-[#6556CD] ri-close-fill right-[5%] top-[5%]"
      ></Link>
      {ytvideos ? <ReactPlayer
        controls
        height={500}
        width={1200}
        url={`https://www.youtube.com/watch?v=${ytvideos.key}`}
      /> : <NotFound/>}
      
    </div>
  )
};

export default Trailer;
