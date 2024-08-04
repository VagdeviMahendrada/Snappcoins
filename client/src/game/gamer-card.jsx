import React, { useEffect, useState } from "react";
import Loader from "../components/gamer-components/utils/Loader";
import { useSelector } from "react-redux";

const Card = (props) => {
  const gaming = useSelector((state) => state.gamerReducer);
  const profile = gaming.gamer;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setImageSrc(
      profile.image
        ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/profile/img/${profile.image}`
        : "assets/img/avatar-gamer.jpg"
    );
  }, [profile.image]);

  const dateString = props.memberSince;
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const localDate = date.toLocaleDateString(undefined, options);

  return (
    <div className="main_profile">
      <div className="author">
        <div className="author_thumb veryfied">
          <i className="bi bi-check"></i>
          <figure className="h-100">
            {!imageLoaded && (
              <div className="loading-spinner">
                <Loader />
              </div>
            )}
            <img
              className={`img-account  mb-4 ${imageLoaded ? "" : "hidden"}`}
              src={imageSrc}
              alt=""
              height="78.375rem"
              width="83.375rem"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          </figure>
        </div>
      </div>
      <h1>@{props.gamerName}</h1>
      <h3 className="content-h2">
        <span class="badge  d-block" style={{ "background-color": "#FF1493" }}>
          {props.walletMoney}
          <small>&nbsp;Snapps</small>
        </span>
      </h3>
      <hr />
    </div>
  );
};

export default Card;
