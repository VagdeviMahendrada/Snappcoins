import React from "react";
import {Link} from "react-router-dom";

function Header() {
  return (
    <header className="header clearfix element_to_stick">
      <div className="layer"></div>
      <div className="container">
        <div className="logo" style={{ paddingTop: "5px" }}>
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

        <ul className="top_menu">
          <li style={{ paddingTop: "5px" }}>
            <span className="color_mode_bt">
              <input id="theme_toggle" type="checkbox" name="theme_toggle" />
              <label
                htmlFor="theme_toggle"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              ></label>
            </span>
          </li>
          <li style={{ paddingTop: "5px" }}>
            <a href="/connect" className="btn_access">
              Connect Snappcoins
            </a>
          </li>
          <li>
            <div className="nice-select">
              <div className="btn_access">
                <span className="current">Login</span>
              </div>
              <ul className="list">
                <li className="option">
                  <a href="/gaming-vendor-login">Gaming Vendor</a>
                </li>
                <li className="option">
                  <a href="/merchant-login">Merchant</a>
                </li>
                <li className="option">
                  <a href="/gamer-login">Gamer</a>
                </li>
                <li className="option">
                  <a href="/admin-dashboard">Admin</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <nav className="main-menu">
        <ul style={{ paddingTop: "5px" }}>
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
    </header>
  );
}


export default Header;