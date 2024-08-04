import React from "react";

import Header from "../../components/general-components/Header";
import Footer from "../../components/general-components/Footer";
import {Fade} from "react-awesome-reveal"

const Connect = () => {
  return (
    <>
      <Header />
      <main>
        <Fade>
        <div
          className="hero_single inner_pages"
          style={{ backgroundImage: `url('assets/img/hero_general.jpg')` }}
        >
          <div
            className="opacity-mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-10 col-md-8">
                  <h1 className="slide-animated one">Connect your Wallet</h1>
                  <p className="slide-animated two">
                   connect your wallet and stream seamlessly
                  </p>
                </div>
              </div>
              {/* /row */}
            </div>
          </div>
          <div className="wave hero"></div>
        </div>

        <div className="container margin_90_60">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <Fade direction="up">
              <a href="#0" className="box_general wallet_connect">
                <div className="ribbon_top">
                  <span className="top_selling">Popular</span>
                </div>
                <figure>
                  <img
                    src="assets/img/meta_mask_logo.svg"
                    alt=""
                    width="80"
                    height="80"
                  />
                </figure>
                <h3>A23 Rummy</h3>
                <p>
                  A23 Games is India's Leading Online Gaming Portal completely
                  owned and operated by Head Digital Works Private Limited.
                </p>
              </a>
              </Fade>
            </div>
            <div className="col-lg-4">
              <Fade direction="up">
              <a href="#0" className="box_general wallet_connect">
                <figure>
                  <img
                    src="assets/img/wallet_connect.svg"
                    alt=""
                    width="80"
                    height="80"
                  />
                </figure>
                <h3>Call Break</h3>
                <p>
                  Play against humans to compete with players around the world.
                  Compete with players around the world and target the scores to
                  compare, beat and surpass other ...
                </p>
              </a>
              </Fade>
            </div>
            <div className="col-lg-4">
              <Fade direction="up">
              <a href="#0" className="box_general wallet_connect">
                <figure>
                  <img
                    src="assets/img/fortmatic.svg"
                    alt=""
                    width="80"
                    height="80"
                  />
                </figure>
                <h3>Ludo King</h3>
                <p>
                  A record breaking casual game in the history of mobile gaming
                  · Voice Chat, 6 Player Ludo, Quick Ludo mode, Tournaments, and
                  many other exciting features!
                </p>
              </a>
              </Fade>
            </div>
          </div>
        </div>
        </Fade>
      </main>

      <Footer />
    </>
  );
};
export default Connect;
