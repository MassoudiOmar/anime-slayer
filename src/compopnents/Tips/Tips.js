import React, { useState, useEffect } from "react";
import "./Tips.css";
import { BiSearch } from "react-icons/bi";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [anime, setAnime] = useState();
  const [search, setSearch] = useState();

  const filterData = async() => {
    console.log(search)
    await axios
    .get(`https://api.jikan.moe/v4/manga?q=${search}&sfw`)
    .then((response) => {
      setAnime(response.data.data);
      console.log(response.data.data,'dce');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getAnime = async () => {
    await axios
      .get("https://api.jikan.moe/v4/manga")
      .then((response) => {
        setAnime(response.data.data);
        console.log(response.data.data,'dce');
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    search?.length>0?filterData():getAnime()
  }, [anime,search]);

  return (
    <div>
      <div className="nav-container">
        <span className="logo">
          {" "}
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Orient_Anime_Logo.png" />
        </span>
        <div className="nav-element">
          <span> <Link style={{ textDecoration: "none", color: "inherit" }} to="/">Home</Link></span>
          <span> <Link style={{ textDecoration: "none", color: "inherit" }} to="/popular">Popular</Link></span>
          <span>Manga</span>
          <span>Help</span>
        </div>
        <div className="nav-element2">
          <span>
            <input
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="  search..."
            />
          </span>
          <span className="search">
            <BiSearch />
          </span>
          <span>
            <MdNotificationsNone />
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
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/Details" state={{id:e.mal_id,gender:"manga"}}>
                <img src={e.images.jpg.image_url} />
                    </Link>                <div className="title-status">
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
