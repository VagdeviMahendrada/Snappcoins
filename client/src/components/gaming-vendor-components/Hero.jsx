import React from "react";

const Hero = () => {
  return (
    <div
      className="hero_single inner_pages author_page jarallax"
      style={{ height: "35vh", width: "100%" }}
      data-jarallax
    >
      <img
        className="jarallax-img"
        src="assets/img/hero_general.jpg"
        alt=""
      />
      <div
        className="opacity-mask"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      ></div>
      <div className="wave hero"></div>
    </div>
  );
};

export default Hero;