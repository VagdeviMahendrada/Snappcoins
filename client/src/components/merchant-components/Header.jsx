import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";
import { logout,merchantProfile } from "../../redux/actions/merchantAction";
import Loader from "./utils/Loader";

const Header = () => {
  const merchantState = useSelector((state) => state.merchantReducer);
  const merchant = merchantState.merchant;
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    //dispatch(merchantProfile())
  },[])
  useEffect(() => {
   
   setTimeout(()=>{
      setImageSrc(
        merchant.image
          ? `api/profile/img/${merchant.image}`
          : "assets/img/avatar-gamer.jpg"
      );
    },2000)
   
  }, [merchant.image]);

  const handleLogoutClick = () => {
    dispatch(logout());
  };
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="header_in clearfix element_to_stick">
      <div className="layer"></div>
      {merchant && (
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
                src="assets/img/logo-light.svg"
                alt=""
                width="170"
                height="35"
                className="light"
              />
            </a>
          </div>
          <ul className="top_menu drop_user">
            <li>
              <span className="color_mode_bt">
                <input id="theme_toggle" type="checkbox" name="theme_toggle"/>
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
                      className={`img-account rounded-circle mb-4 ${
                        imageLoaded ? "" : "hidden"
                      }`}
                      src={`http://localhost:3003/${imageSrc}`}
                      alt=""
                      height="54.375rem"
                      width="54.375rem"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(false)}
                    />
                  </figure>
                  <div className="balance">
                    <h6 className="mb-0">{merchant.companyName}</h6>
                    <span>{merchant.walletMoney} Snapps</span>
                  </div>
                </Link>
                <div className={`dropdown-menu dropdown-menu-end animate ${
                    isOpen ? "fadeIn show" : ""
                  }`}>
                  <div className="dropdown-menu-content">
                    <figure>
                      <img
                        src="assets/img/cover_small.jpg"
                        alt=""
                        width="300"
                        height="138"
                      />
                    </figure>
                    <h4>@{merchant.companyName}</h4>
                    {/* <p className="author_number">
                      Ox465d53...9df5{" "}
                      <a href="#0">
                        <i className="bi bi-clipboard"></i>
                      </a>
                    </p> */}
                    <div className="balance">
                      <h4>Balance</h4>
                      <span>{merchant.walletMoney} Snapps</span>
                    </div>
                    <ul>
                      <li>
                        <a href="/merchant-profile">
                          <i className="bi bi-pen"></i>Edit profile
                        </a>
                      </li>
                      <li>
                        <a href="/merchant-dashboard">
                          <i className="bi bi-image"></i>Dashboard
                        </a>
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
                  src="assets/img/logo-placeholder.png"
                  data-src="assets/img/logo.svg"
                  alt=""
                  width="120"
                  height="30"
                  className="dark lazy"
                />
                <img
                  src="assets/img/logo-placeholder.png"
                  data-src="assets/img/logo-light-mode.svg"
                  alt=""
                  width="120"
                  height="30"
                  className="light lazy"
                />
              </a>
            </div>
            <ul>
              <li className="submenu">
                <a href="/" className="show-submenu">
                  Home
                </a>
              </li>
              <li className="submenu">
                <a href="/catalog" className="show-submenu">
                  Explore
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
