//Done
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { gamerProfile, logout } from "../../redux/actions/gamerAction";
import Loader from "./utils/Loader";
import useFetch from "../../hooks/useFetch-gamer";
import { useCallback } from "react";
const Header = () => {
  const gamerState = useSelector((state) => state.gamerReducer);
  const gamer = gamerState.gamer;
  const dispatch = useDispatch();
  console.log(gamer)
  //console.log("GG: ",gamer)
  //console.log("cart: ",gamer.cart);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {

    setImageSrc(
      gamer?.image
        // ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/profile/img/${gamer.image}`
        // : "assets/img/avatar-gamer.jpg"
        ? `http://localhost:3004/api/profile/img/${gamer.image}`
        : "assets/img/avatar-gamer.jpg"
    );
  }, [gamer?.image, gamer?.cart]);
  const [user, setUser] = useState();

  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const [fetchData, { loading }] = useFetch();

  //const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    const config = {
      url: "/profile",
      method: "get",
      headers: { Authorization: token },
    };
    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setUser(data.user);
        console.log("d is: ", data);
        dispatch(gamerProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, dispatch]);
  console.log("user", user)

  useEffect(() => {
    if (!token) {
      // Redirect to login page if token is null
      navigate('/', { state: { message: "You are not logged in." } })

    } else {
      fetchUser();
    }

  }, [fetchUser]);

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="header_in clearfix element_to_stick">
      <div className="layer"></div>
      {gamer && (
        <div className="container">
          <div className="logo">
            <a href="/">
              <img
                src="assets/img/logo.svg"
                alt=""
                width="170"
                height="35"
                className="dark"
              />
              <img
                src="assets/img/logo-light-mode.svg"
                alt=""
                width="170"
                height="35"
                className="light"
              />
            </a>
          </div>
          <ul className="top_menu drop_user">
            <li>
              <span class="color_mode_bt">
                <input
                  id="theme_toggle"
                  type="checkbox"
                  name="theme_toggle"
                  checked={darkMode}
                  onChange={handleToggle}
                />
                <label htmlFor="theme_toggle"></label>
              </span>
            </li>
            <li>
              <div className={`dropdown user clearfix ${isOpen ? "show" : ""}`}>
                <Link
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  <figure>
                    {/* <!-- Profile picture image--> */}
                    {!imageLoaded && (
                      <div className="loading-spinner">
                        {" "}
                        <Loader />{" "}
                      </div>
                    )}
                    <img
                      className={`img-account rounded-circle mb-4 ${imageLoaded ? "" : "hidden"
                        }`}
                      src={imageSrc}
                      alt=""
                      height="54.375rem"
                      width="54.375rem"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(false)}
                    />
                  </figure>
                  <div className="balance">
                    <h6 className="mb-0">{gamer.userName}</h6>
                    <span>{gamer.walletMoney} Snapps</span>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu dropdown-menu-end animate ${isOpen ? "fadeIn show" : ""
                    }`}
                >
                  <div className="dropdown-menu-content">
                    <figure>
                      <img
                        src="https://distil.in/demo/snappcoins/img/cover_small.jpg"
                        alt=""
                        width="300"
                        height="138"
                      />
                    </figure>
                    <h4>@{gamer.userName}</h4>
                    {/* <p className="author_number">
                      {gamer._id}{" "}
                      <a href="#0">
                        <i className="bi bi-clipboard"></i>
                      </a>
                    </p>*/}
                    <div className="balance">
                      <h4>Balance</h4>
                      <span>{gamer.walletMoney} Snapps</span>
                    </div>
                    <ul>
                      <li>
                        <a href="/gamer-profile">
                          <i className="bi bi-pen"></i>Edit profile
                        </a>
                      </li>
                      <li>
                        <Link to="/gamer-dashboard">
                          <i className="bi bi-image"></i>Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/gamer-mycart">
                          <i className="bi bi-cart"></i>My Cart
                        </Link>
                      </li>
                      <li onClick={handleLogoutClick}>
                        <a href="/">
                          <i className="bi bi-box-arrow-right"></i>Log out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <a href="#0" className="open_close">
            <i className="bi bi-list"></i>
            <span>Menu</span>
          </a>
          <nav className="main-menu">
            <div id="header_menu">
              <a href="#0" className="open_close">
                <i className="bi bi-x"></i>
              </a>
              <a href="/" className="logo_menu">
                <img
                  src="assets/img/logo.svg"
                  alt=""
                  width="120"
                  height="30"
                  className="dark lazy"
                />
                <img
                  src="assets/img/logo-light-mode.svg"
                  alt=""
                  width="120"
                  height="30"
                  className="light lazy"
                />
              </a>
            </div>
            <ul>
              <li className="submenu">
                <a href="/gamer-dashboard" className="show-submenu">
                  Home
                </a>
              </li>
              <li className="submenu">
                <a href="" className="show-submenu">
                  Explore
                </a>
              </li>
              <li className="submenu">
                <a href="" className="show-submenu" style={{ position: "relative" }}>
                  <i className="bi bi-cart" style={{ position: "relative" }}>
                    <p
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "5px",
                        zIndex: "1",
                        backgroundColor: "white",
                        color: "green",
                        borderRadius: "50%",
                        paddingLeft: "0px",
                        fontSize: "12px",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      <b>{gamer.cart}</b>
                    </p>
                  </i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;