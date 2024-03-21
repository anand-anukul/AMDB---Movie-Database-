import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../no_image.png"

const TrendingCards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full h-full px-[20%] pt-[5%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="relative w-[25vh] mr-[5%] mb-[5%]" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.4)] h-[40vh] object-cover "
            src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }` : noimage}
            alt=""
          />
          <h1 className="text-xl text-zinc-300 mt-3 font-semibold">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="text-zinc-300">
              <i className="text-yellow-300 ri-star-fill pr-2"></i>
              {c.vote_average.toFixed(1)}/10
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default TrendingCards;
