import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jarallax } from "jarallax";

import Header from "../../components/general-components/Header";
import Footer from "../../components/general-components/Footer";
import NewItem from "../../components/general-components/NewItem";
import Loader from "../../components/general-components/Loader";
import CarouselPro from "../../components/general-components/CarouselPro";
import { Fade } from "react-awesome-reveal";
import "animate.css";

const Home = () => {
  useEffect(() => {
    jarallax(document.querySelectorAll(".jarallax"));
  }, []);
  const [products, setProducts] = useState([]);
  const [productsLoaded, setLoaded] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchTerm_home, setSearchTerm_home] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaded(false);
        const response_prod = await axios.get(
          "http://localhost:3002/api/merchandise/gethome"
        );
        setProducts(response_prod.data.merchandises);
        setLoaded(true);
        setFeaturedProducts(response_prod.data.featured_products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm_home]);

  return (
    <>
      <Header />

      <main>
        <Fade>
          <div
            className="hero_single version_2 jarallax animate__fadeInUp"
            style={{
              position: "relative",
              overflow: "hidden",
              background:
                "url(./path/to/poster.jpg) no-repeat center center fixed",
              backgroundSize: "cover",
            }}
          >
            <video
              className="jarallax-video"
              autoPlay
              muted
              loop
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: "100%",
                minHeight: "100%",
                width: "auto",
                height: "auto",
                opacity: "0.4",
              }}
            >
              <source
                src="https://distil.in/demo/snappcoins/video/intro_blue1.mp4"
                type="video/mp4"
              />
              <source
                src="https://distil.in/demo/snappcoins/video/intro_blue1.webm"
                type="video/webm"
              />
              <source
                src="https://distil.in/demo/snappcoins/video/intro_blue1.ogv"
                type="video/ogg"
              />
            </video>

            <div
              className="opacity-mask"
              data-opacity-mask="rgba(0, 0, 0, 0.5)"
            >
              <div className="container">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-7">
                    <h1>
                      Discover, Collect,
                      <br />
                      and Redeem Snapps!
                    </h1>
                    <p>The Largest Redemption Platform for Gamers</p>
                    <form method="post" action="catalog">
                      <div className="row g-0 custom-search-input mx-auto">
                        <div className="col-md-9">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Search item..."
                              value={searchTerm_home}
                              onChange={(e) => {
                                setSearchTerm_home(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <input
                            type="submit"
                            value="Find"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/catalog", {
                                state: { searchTerm_home: searchTerm_home },
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="search_trends"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div style={{ fontWeight: "bold" }}>Trending:</div>
                        <Link style={{ color: "white" }} to="#0">
                          &nbsp;Art,&nbsp;
                        </Link>
                        <Link style={{ color: "white" }} to="#0">
                          Games,&nbsp;
                        </Link>
                        <Link style={{ color: "white" }} to="#0">
                          Photo
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="wave hero"></div>
          </div>

          <br />
          <br />
          <div className="container margin_90_90">
            <div className="main_title center">
              <span>
                <em></em>
              </span>
              <h2>Featured Products</h2>
              <p>Premium products with fabulous offers!</p>
            </div>

            {/* <div className="owl-carousel owl-theme featured_carousel owl-loaded owl-drag"
            style={{
              animationName: "slideInUp",
              animationDuration: "300ms",
              animationTimingFunction: "ease",
              animationDelay: "0ms",
              animationDirection: "normal",
              animationFillMode: "both"
            }}>
            <div className='owl-stage-outer'>
              <div className='owl-stage' style={{
                width : "1922px"
              }}>
              <FeaturedPro />
              <FeaturedPro />
              <FeaturedPro />
              <FeaturedPro />
              </div>
            </div>
            <div className='owl-nav'>
              <button type='button' role="presentation" className='owl-prev'>
                <i className='bi bi-chevron-left'></i>
              </button>
              <button type='button' role="presentation" className='owl-next'>
                <i className='bi bi-chevron-right'></i>
              </button>
            </div>
          </div> */}
            <div
              id="carouselItems"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {featuredProducts.map((product, index) => {
                  return (
                    <CarouselPro
                      index={index}
                      price={product.price}
                      desc={product.description}
                      brand={product.brand}
                      title={product.title}
                      count={product.count}
                      img={product.image}
                      userid={product.userid}
                      genre={product.category}
                      datatopass={product}
                    />
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselItems"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselItems"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <p className="text-center mt-4">
              <a href="/catalog" className="btn_1 medium pulse_bt">
                Start Redeeming
              </a>
            </p>
          </div>

          <div className="bg_gray">
            <div className="container margin_120_90">
              <div className="main_title version_2">
                <span>
                  <em></em>
                </span>
                <h2>Weekly Top Games</h2>
                <p>New games added every week!</p>
                <Link>
                  View All <i className="bi bi-arrow-right"></i>
                </Link>
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
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <Fade direction="up">
                      <Link className="author">
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
                      </Link>
                    </Fade>
                  </div>
                </div>
              </Fade>

              <div
                className="banner mt-5 lazy"
                style={{ backgroundImage: "url(assets/img/banner_bg.jpg)" }}
              >
                <div
                  className="d-flex align-items-center opacity-mask justify-content-between p-5"
                  style={{ opacity: "rgba(0, 0, 0, 0.2)" }}
                >
                  <div>
                    <small>Join Snappcoins</small>
                    <h3>Become a Partner</h3>
                    <p>Showcase your games and attract loyal fans!</p>
                  </div>
                  <div>
                    <a
                      href="/gaming-vendor-login"
                      className="btn_1 medium pulse_bt"
                    >
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container margin_120_90">
            <div className="main_title version_2">
              <span>
                <em></em>
              </span>
              <h2>New Items</h2>
              <p>Redeem your Snapps from the latest products in our catalog!</p>
              <a href="\catalog">
                View All <i className="bi bi-arrow-right"></i>
              </a>
            </div>

            <Fade cascade>
              {productsLoaded ? (
                <div className="row d-flex justify-content-center ">
                  {products.map((product) => {
                    return (
                      <NewItem
                        price={product.price}
                        desc={product.description}
                        brand={product.brand}
                        title={product.title}
                        count={product.count}
                        img={product.image}
                        userid={product.userid}
                        genre={product.category}
                        datatopass={product}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="d-flex row justify-content-center align-items-center m-5 p-5">
                  {" "}
                  <Loader />{" "}
                </div>
              )}
            </Fade>
            <p className="text-center mt-4">
              <a href="/catalog" className="btn_1 gradient pulse_bt">
                View New Items
              </a>
            </p>
          </div>

          <div className="bg_gray">
            <div className="container margin_120_90">
              <div className="main_title center mb-5">
                <span>
                  <em></em>
                </span>
                <h2>Create Your Account & Start Snapping!</h2>
                <p>
                  Create your account and start redeeming in 3 simple steps!
                </p>
              </div>
              <div className="row justify-content-md-center how_2">
                <div className="col-lg-5 text-center">
                  <figure className="mb-5">
                    <img
                      src="assets/img/web_wireframe.svg"
                      alt=""
                      className="img-fluid lazy"
                      width="360"
                      height="380"
                    />
                  </figure>
                </div>
                <div className="col-lg-5">
                  <ul>
                    <li>
                      <h3>
                        <span>#01.</span> Set up your Snappcoins account
                      </h3>
                      <p>Signup using your email / mobile number</p>
                    </li>
                    <li>
                      <h3>
                        <span>#02.</span> Check your Snapp balance
                      </h3>
                      <p>
                        Your dashboard will indicate the Snapps earned by you
                        from the games you have played.
                      </p>
                    </li>
                    <li>
                      <h3>
                        <span>#03.</span> Use your Snapps & redeem!
                      </h3>
                      <p>
                        Browse through our catalog and exchange your Snapps with
                        our fabulous range of products.
                      </p>
                    </li>
                  </ul>{" "}
                  <p className="add_top_30">
                    <a href="/gamer-login" className="btn_1">
                      Join Now!
                    </a>
                  </p>
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
export default Home;
