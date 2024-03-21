import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadpeople } from "../store/actions/peopleActions";
import { removepeople } from "../store/reducers/peopleSlice";
import Loading from "./Loading";
import HorizontalCards from "../components/template/HorizontalCards";
import Dropdown from "./template/Dropdown";

const PeopleInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { info } = useSelector((store) => store.people);
  const [category, setcategory] = useState("movie");
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id]);

  return info ? (
    <div className="w-screen px-[15%] h-[200vh] bg-[#1F1E24]">
      <nav className="h-[10vh] w-full text-zinc-200 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          class="text-2xl px-2 text-zinc-200 hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.4)] h-[40vh] object-cover "
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-6 w-[90%] mb-3"></hr>

          <div className="text-xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i class="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i class="ri-facebook-box-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>

          <h1 className="text-2xl text-white font-semibold mt-5 mb-5">
            Person Info
          </h1>
          <h1 className="text-lg text-white font-semibold ">Known For</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg text-white font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-white font-semibold mt-3">Birthday</h1>
          <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>

          <h1 className="text-lg text-white font-semibold mt-3">Deathday</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-lg text-white font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400 ">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-white font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.also_known_as.join(" , ")}
          </h1>
        </div>

        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-white font-black ">
            {info.detail.name}
          </h1>
          <h1 className="text-lg text-white font-semibold  mt-3">Biography</h1>
          <p className=" text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-lg text-white font-semibold  mt-3">
            Popular For
          </h1>
          <div className="">
            <HorizontalCards data={info.combinedCredits.cast} />
          </div>

          <div className="w-full flex justify-between">
            <h1 className="text-xl text-white font-semibold ">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="w-full h-[50vh] mt-5 text-zinc-400 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white p-5 rounded hover:bg-[#19191D] duration-300 cursor-pointer">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block pl-5">{c.character && `Character Name : ${c.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PeopleInfo;
