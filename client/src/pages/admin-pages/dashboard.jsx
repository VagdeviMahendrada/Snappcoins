import React from "react";

import Footer from "../../components/general-components/Footer";
import Header from "../../components/general-components/Header";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Fade>
        <div className="hero_single version_2 jarallax" data-jarallax="">
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
              <div className="row">
                <div className="col-xl-7 col-lg-8 pt-lg-5">
                  <h1 className="slide-animated one">Welcome Snappstar!</h1>
                  <p className="slide-animated two">
                    Here's the latest stats for you!
                  </p>
                  <div className="count slide-animated three">
                    <ul>
                      <li>
                        <h4 className="text-primary">$150K</h4>Snapps Sold
                      </li>
                      <li>
                        <h4 className="text-primary">32K</h4>Snapps Earned
                      </li>
                      <li>
                        <h4 className="text-primary">12K</h4>Snapps Redeemed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container margin_90_60">
          <div className="row justify-content-center">
            <div className="col-lg-3">
              <a className="box_topic " href="#0">
                <span>
                  <i className="bi bi-globe" />
                </span>
                <h3>Gaming Partners</h3>
                <div className="count slide-animated three mb-4">
                  <ul>
                    <li>
                      <h4 className="text-primary">160</h4>partners
                    </li>
                  </ul>
                </div>
              </a>
            </div>
            <div className="col-lg-3">
              <a className="box_topic " href="#0">
                <span>
                  <i className="bi bi-basket-fill" />
                </span>
                <h3>Merchants</h3>
                <div className="count slide-animated three mb-4">
                  <ul>
                    <li>
                      <h4 className="text-primary">110</h4>Merchants
                    </li>
                  </ul>
                </div>
              </a>
            </div>
            <div className="col-lg-3">
              <a className="box_topic " href="#0">
                <span>
                  <i className="bi bi-tag-fill" />
                </span>
                <h3>Products</h3>
                <div className="count slide-animated three mb-4">
                  <ul>
                    <li>
                      <h4 className="text-primary">7650</h4>Products
                    </li>
                  </ul>
                </div>
              </a>
            </div>
            <div className="col-lg-3">
              <a className="box_topic " href="#0">
                <span>
                  <i className="bi bi-people-fill" />
                </span>
                <h3>Gamers</h3>
                <div className="count slide-animated three mb-4">
                  <ul>
                    <li>
                      <h4 className="text-primary">15423</h4>Gamers
                    </li>
                  </ul>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="bg_gray">
          <div className="container margin_120_90">
            <div className="main_title version_2">
              <h2>Weekly Top Games</h2>
              <p>New games added every week!</p>
              <a href="#0">
                View All <i className="bi bi-arrow-right" />
              </a>
            </div>
            <Fade>
                <div className="row author_list">
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>1</strong>
                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar1.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Junglee Rummy</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>2</strong>

                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar2.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Callbreak</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>3</strong>

                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar3.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Ludo King</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>4</strong>
                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar4.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Cricket League</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>5</strong>
                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar5.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Evony</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>6</strong>
                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar6.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Coin Master</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>7</strong>
                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar7.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Free Fire Max</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>8</strong>
                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar8.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Klondike Adventures</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <a className="author">
                        <strong>9</strong>
                        <div className="author_thumb veryfied ms-5">
                          <i className="bi bi-check"></i>
                          <figure>
                            <img
                              src="assets/img/avatar9.jpg"
                              alt=""
                              className="lazy"
                              width="100"
                              height="100"
                            />
                          </figure>
                        </div>
                        <div>
                          <h6>Airforce Royale</h6>
                        </div>
                      </a>
                    </Fade>
                  </div>
                </div>
              </Fade>

          </div>
        </div>
        </Fade>
      </main>

      <Footer />
    </>
  );
}
