import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/general-components/Footer";

const Game = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3004/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          navigate(`/game?id=${data.id}&token=${data.token}`);
        }
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
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
          >
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-7">
                  <h1>X &nbsp;&nbsp; The Tic-Tac-Toe Game &nbsp;&nbsp; O</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="wave hero"></div>
        </div>

        <div className="" id="submit">
          <div className="container" style={{ marginTop: "5em" }}>
            <div className="row justify-content-center">
            <div className="main_title center">
                  <span>
                    <em />
                  </span>
                  <h2>Ultimate Tic-Tac-Toe</h2>
                  <p>
                  Unleash Your Tactical Brilliance in Tic Tac Toe! <br />
                  </p>
                </div>
              <div className="col-lg-5">
                <div style={{ justifyContent: "center" }}>
                  <form id="register-2" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email*"
                        name="email"
                        id="email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password*"
                        name="password-signin"
                        id="password"
                      />
                    </div>
                    <div className="text-center form-group">
                      <div className="clearfix add_bottom_30">
                        <div className="checkboxes float-start">
                          <label className="container_check">
                            Remember me
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="float-end">
                          <Link id="forgot" to="#">
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                      <input
                        type="submit"
                        className="btn_1 medium pulse_bt"
                        value="Sign In"
                        id="sign-in-btn"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Game;
