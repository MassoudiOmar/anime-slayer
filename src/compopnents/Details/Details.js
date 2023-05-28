import React, { useState, useEffect } from "react";
import "./Details.css";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import axios from "axios";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Home(props) {
  const [anime, setAnime] = useState();
  const location = useLocation();
  const propsData = location.state;

  const getAnime = async () => {
    var gender = propsData.gender
    await axios
      .get(`https://api.jikan.moe/v4/${gender}/${propsData.id}`)
      .then((response) => {
        setAnime(response.data.data);
        console.log(response.data.data, "aha");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <div>
      <div className="nav-container">
        <span className="logo">
          {" "}
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Orient_Anime_Logo.png" />
        </span>
        <div className="nav-element">
        <span> <Link style={{ textDecoration: "none", color: "inherit" }} to="/">Home</Link></span>
          <span> <Link style={{ textDecoration: "none", color: "inherit" }} to="/Popular">Popular</Link></span>
          <span> <Link style={{ textDecoration: "none", color: "inherit" }} to="/Manga">Manga</Link></span>
          <span>Help</span>
        </div>
        <div className="nav-element2">
          <span>
            <MdNotificationsNone />
          </span>
          <span>
            <MdPerson />
          </span>
        </div>
      </div>
      <div className="Main-Detail">
        <div className="card-Detail">
          <div className="anime-list-Detail">
            <img src={anime?.images.webp.large_image_url} />
          </div>
          <div className="details">
            <span className="anime-title">{anime?.title}</span>
            <span className="synopsis">{anime?.synopsis}</span>
            {
propsData.gender == "anime" ?
            <span className="release-date">Release date: {anime?.aired.string}</span>:<span className="release-date">Release date: {anime?.published.string}</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
