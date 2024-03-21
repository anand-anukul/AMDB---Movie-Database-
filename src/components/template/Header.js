import React from "react";
import { Link } from "react-router-dom";
const Header = ({ data }) => {
  return (
    <div
      className="w-full h-[50vh] flex flex-col justify-end p-[4%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center 5%",
        backgroundSize: "cover",
      }}
    >
      <h1 className="w-[70%] text-4xl text-zinc-200 font-black pb-3 ">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] text-white">
        {data.overview.slice("0:50")}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white">
        <i className=" text-yellow-400 ri-megaphone-fill m-2"></i>
        {data.release_date || "No Information"}
        <i className="text-yellow-400 ri-album-fill mr-2 ml-5"></i>
        {data.media_type}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-3 rounded lg bg-purple-600 w-[15%] mt-4 text-center text-white">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
