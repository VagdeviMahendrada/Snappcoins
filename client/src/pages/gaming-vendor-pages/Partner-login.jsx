import React from "react";

import Header from "../../components/general-components/Header.jsx";
import Footer from "../../components/general-components/Footer.jsx";
import LoginForm from "../../components/gaming-vendor-components/LoginForm.jsx";
import { Fade } from "react-awesome-reveal"

const Login = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Snappcoins - Ready , Steady, Snapp!" />
      <meta name="author" content="Snappcoins" />
      <title>Snappcoins - Ready , Steady, Snapp!</title>

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
                  <h1 className="slide-animated one">Become a Partner</h1>
                  <p className="slide-animated two">
                    Build your Gaming Tribe. Now!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="wave hero"></div>
        </div>

        <div className="container margin_60_90">
          <div className="main_title center">
            <span>
              <em />
            </span>
            <h2>Join Snappcoins</h2>
            <p>
              Engage and incentivize your gamers with the largest gaming
              redemption platform
            </p>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="box_why">
                <figure>
                  <img
                    src="assets/img/why_1.svg"
                    alt=""
                    width={200}
                    height={200}
                    className="img-fluid"
                  />
                </figure>
                <h3>Boost your Revenue</h3>
                <p className="lead">
                  {" "}
                  Create stickiness and incentivize your users.
                </p>
                <p>
                  Unlock new revenue streams and propel your success with our
                  innovative solutions that boost monetization opportunities,
                  helping you maximize your earnings and achieve sustainable
                  growth.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_why">
                <figure>
                  <img
                    src="assets/img/why_2.svg"
                    alt=""
                    width={200}
                    height={200}
                    className="img-fluid"
                  />
                </figure>
                <h3>Manage Snapps</h3>
                <p className="lead">
                  Multiple Games? No problem. Allocate Snapps to your game
                  portfolio.
                </p>
                <p>
                  Simplify and streamline your gaming experience by efficiently
                  managing your Snapps across multiple games, ensuring seamless
                  transitions and empowering you to make the most of your gaming
                  investments.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_why">
                <figure>
                  <img
                    src="assets/img/why_3.svg"
                    alt=""
                    width={200}
                    height={200}
                    className="img-fluid"
                  />
                </figure>
                <h3>Reach New Gamers</h3>
                <p className="lead">Onboard new gamers through Snappcoins.</p>
                <p>
                  Attract a wider audience and expand your player base by
                  implementing effective strategies that help you reach and
                  connect with new gamers, opening up exciting possibilities for
                  growth and success.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* /container */}
        <div className="bg_gray" id="submit">
          <div className="container margin_120_90">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="main_title center">
                  <span>
                    <em />
                  </span>
                  <h2>Please fill the form below</h2>
                  <p>
                    Interested in partnering with us? <br />
                  </p>
                </div>
                <div id="message-register" />

                <LoginForm />

                <div id="error-message" className="error-message" />
                <div id="toast" className="center">
                  <div className="checkicon">
                    <i className="fas fa-check-square" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Fade>
      </main>
      
      <Footer />
    </>
  );
};

export default Login;
