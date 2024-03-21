import React from "react";
import noimage from "../../no_image.png";
import { Link } from "react-router-dom";
const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] p-3">
      <div className="  w-[100%]  flex overflow-y-hidden">
        {data.length > 0 ? (
          data.map((d, i) => (
            <Link
              to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className="min-w-[15%] mr-5 h-[30vh]  bg-zinc-900"
            >
              <img
                src={
                  d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.poster_path
                      }`
                    : noimage
                }
                className=" w-full h-[55%] object-cover"
                alt=""
              ></img>
              <div className="text-white mt-2 h-[45%] oberflow-y-auto">
                <h1 className="hover:text-[#6556CD] cursor-pointer text-x font-semibold">
                  {d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p className=" text-xs ">{d.overview.slice(0, 100)}</p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-white text-center mt-5 font-black tex-3xl">
            No Recommendations
          </h1>
        )}
      </div>
    </div>
  );
};

export default HorizontalCards;
