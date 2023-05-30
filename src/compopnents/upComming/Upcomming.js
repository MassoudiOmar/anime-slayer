import React, { useState, useEffect } from "react";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import axios from "axios";
import { Outlet, Link,useLocation } from "react-router-dom";

export default function Home(props) {
  const [anime, setAnime] = useState();
  const location = useLocation();
  const propsData = location.state;

  const getAnime = async () => {
   
  console.log(propsData);

    await axios
      .get("https://api.jikan.moe/v4/seasons/upcoming")
      .then((response) => {
        setAnime(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    getAnime()
  }, []);

  return (
    <div>
      <div className="nav-container">
        <span className="logo">
          {" "}
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Orient_Anime_Logo.png" />
        </span>
        <div className="nav-element">
          <span><Link style={{ textDecoration: "none", color: "inherit" }} to="/">Home</Link></span>
          <span>Popular</span>
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
      <div className="Main">
        <div className="card">
          {anime?.map((e, i) => {
            return (
              <div className="anime-list" key={i}>
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/Details" state={{id:e.mal_id,gender:"anime"}}>
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
