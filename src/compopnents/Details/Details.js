import React, { useState, useEffect } from "react";
import "./Details.css";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import axios from "axios";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Home(props) {
  const [anime, setAnime] = useState();
  const [animeRelations, setAnimeRelations] = useState();
  const [animeRecommendation, setAnimeRecommendation] = useState();
  const [ids, setIds] = useState();

  const location = useLocation();
  const propsData = location.state;

  var [gender,setGender] =useState(propsData.gender)
  var [id,setMalId] =useState(propsData.id)

  const getAnime = async () => {
    await axios
      .get(`https://api.jikan.moe/v4/${gender}/${id}`)
      .then((response) => {
        setAnime(response.data.data);
        setIds(response.data.data.images.jpg.image_url, "ahaaa");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnimeRecommendation = async () => {
    await axios
      .get(`https://api.jikan.moe/v4/${gender}/${id}/recommendations`)
      .then((response) => {
        setAnimeRecommendation(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnimeRelation = async () => {
    gender == "anime"
      ? await axios
          .get(`https://api.jikan.moe/v4/${gender}/${id}/episodes`)
          .then(async (response) => {
            setAnimeRelations(response.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
      : await axios
          .get(`https://api.jikan.moe/v4/manga/${id}/pictures`)
          .then(async (response) => {
            setAnimeRelations(response.data.data);
            console.log(response.data.data, "images");
          })
          .catch((err) => {
            console.log(err);
          });
  };

  useEffect(() => {
    getAnime();
    setTimeout(() => {
      getAnimeRecommendation();
      getAnimeRelation();
    }, 2000);
  }, [id]);

  return (
    <div>
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
            {propsData.gender == "anime" ? (
              <span className="synopsiss">
                Release date: {anime?.aired?.string}
              </span>
            ) : (
              <span className="synopsiss">
                Release date: {anime?.published?.string}
              </span>
            )}
            <span className="synopsiss">{anime?.rating}</span>
            <span className="synopsiss">{anime?.duration}</span>
            <span className="synopsiss">{anime?.year}</span>
            {anime?.genres.map((e, i) => {
              return <span className="synopsiss" key={i}>{e?.name}</span>;
            })}
          </div>
        </div>
      </div>
      {animeRelations?.length > 0 ? (
        <span className="rec">
          {propsData.gender == "anime" ? "Episodes" : "Pages"} :
        </span>
      ) : null}
      {propsData.gender == "anime" ? (
        <div className="card-rec">
          {animeRelations?.map((e, i) => {
            return (
              <div className="anime-recomendation" key={i}>
                <img className="image-rec" src={ids} />
                <div className="title-recommendation">
                  <p className="title-rec">
                    {e?.title?.length > 10
                      ? e?.title.substring(0, 20) + "..."
                      : e?.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card-rec">
          {animeRelations?.map((e, i) => {
            return (
              <div className="anime-recomendation" key={i}>
                <img className="image-rec" src={e?.jpg?.image_url} />
              </div>
            );
          })}
        </div>
      )}
      <div>
        {animeRecommendation?.length > 0 ? (
          <span className="rec">Recommondations :</span>
        ) : null}
        <div className="card-rec">
          {animeRecommendation?.map((e, i) => {
            return (
              <div className="anime-recomendation" key={i}>
                <img
                  className="image-rec"
                  src={e.entry?.images?.jpg.image_url}
                  onClick={() => {
                    setGender(gender)
                    setMalId(e.entry.mal_id)
                  }}
                />

                <div className="title-recommendation">
                  <p className="title-rec">
                    {e?.entry?.title?.length > 10
                      ? e?.entry.title.substring(0, 20) + "..."
                      : e?.entry.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
