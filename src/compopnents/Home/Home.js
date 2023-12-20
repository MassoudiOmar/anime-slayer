import React, { useState, useEffect } from "react";
import "./Home.css";
import { BiSearch } from "react-icons/bi";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [anime, setAnime] = useState();
  const [search, setSearch] = useState();




  const filterData = async () => {
    await axios
      .get(`https://api.jikan.moe/v4/anime?q=${search}&sfw`)
      .then((response) => {
        setAnime(response.data.data);
        console.log(response.data.data, "dce");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnime = async () => {
    await axios
      .get("https://api.jikan.moe/v4/anime")
      .then((response) => {
        setAnime(response.data.data);
        console.log(response.data.data, "dce");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    search?.length > 3 ? filterData() : getAnime();
  }, [anime, search]);

  return (
    <div className="all">
      <div className="nav-container">
        <span className="logo">
          {" "}
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Orient_Anime_Logo.png" />
        </span>
        <div className="nav-element">
          <span>
            {" "}
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              Home
            </Link>
          </span>
          <span>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/Popular"
            >
              Popular
            </Link>
          </span>
          <span>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/Manga"
            >
              Manga
            </Link>
          </span>
          <span> <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/Up Coming"
            >
              Up Coming
            </Link></span>
        </div>
        <input
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="  search..."
            />
        <div className="nav-element2">
         
          <span className="search">
            <BiSearch />
          </span>
          <span>
<MdNotificationsNone onClick={() =>
  axios.post('https://cnopt.vercel.app/api/pharmacienLogin')
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
} />


                </span>
          <span>
            <MdPerson />
          </span>
        </div>
      </div>
      <div className="Main">
        <div className="card">
          {anime?.map((e, i) => {
            return (
              <div className="anime-list" key={i}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/Details"
                  state={{ id: e.mal_id, gender: "anime" }}
                >
                  <img src={e.images.jpg.image_url} />
                </Link>
                <div className="title-status">
                  <p className="title">
                    {e.title.length > 10
                      ? e.title.substring(0, 10) + "..."
                      : e.title}
                  </p>
                  <p className="status">{e.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
