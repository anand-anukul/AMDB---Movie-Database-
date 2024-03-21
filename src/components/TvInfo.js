import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv } from "../store/actions/TvActions";
import { removetv } from "../store/reducers/tvSlice";
import Loading from "./Loading";
import HorizontalCards from "../components/template/HorizontalCards";

const TvInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { info } = useSelector((store) => store.tv);
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      className="w-screen  min-h-[200vh] px-[10%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center 5%",
        backgroundSize: "cover",
      }}
    >
      <nav className="h-[10vh] w-full text-zinc-200 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          class="text-2xl px-2 text-zinc-200 hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex mt-[3%]">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.4)] h-[60vh] object-cover "
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-zinc-300">
          <h1 className="text-5xl text-zinc-100 font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-xl text-zinc-300 font-bold">
              ({info.detail.first_air_date})
            </small>

            <div className="flex items-center mt-2 gap-x-8">
              <h1 className="text-xl font-medium text-zinc-200">
                Release Date : {info.detail.release_date}
              </h1>
              <h1 className="text-xl font-medium text-zinc-200">
                {info.detail.genres.map((m) => m.name).join(" ")}
              </h1>
              <h1 className="text-xl font-medium text-zinc-200">
                {info.detail.runtime} min
              </h1>
            </div>
          </h1>
          <h1 className="mt-5 text-xl text-zinc-200 font-semibold italic">
            {info.detail.tagline}
          </h1>
          <h1 className="mt-5 mb-3 text-xl text-zinc-200 font-bold">
            Overview
          </h1>
          <p className="text-semibold w-[100%]">{info.detail.overview}</p>

          <h1 className="mt-5 mb-3 text-xl text-zinc-200 font-bold">
            Tv Show Translated In :{" "}
          </h1>
          <p className="text-semibold w-[100%] mb-5">
            {info.translations.join(" ")}
          </p>

          <Link
            className="bg-[#6556cd] rounded-lg p-3"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-xl "></i>Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] flex flex-col gap-y-3 mt-5">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center gap-x-7 text-white ">
            <h1>Available on Platforms :</h1>
            {info.watchproviders.flatrate.map((w,i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center gap-x-7 text-white ">
            <h1>Available on Rent :</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center gap-x-7 text-white ">
            <h1>Available for Buy :</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      <hr className="mt-6"></hr>
      <h1 className="text-zinc-300 font-semibold text-2xl mt-10 mb-4">Seasons </h1>
      {info.detail.seasons ? <HorizontalCards
        data={info.detail.seasons}
      /> : <h1 className="text-white text-center mt-5 font-black tex-3xl">No Seasons</h1>}

      <hr className="mt-6"></hr>
      <h1 className="text-zinc-300 font-semibold text-2xl mt-10 mb-4">
        Recommendations and Similar{" "}
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvInfo;
