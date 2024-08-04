import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header_in clearfix element_to_stick">
      <div className="layer"></div>
      <div className="container">
        <div className="logo">
          <Link to="/">
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
          </Link>
        </div>
        <ul className="top_menu drop_user">
          <li>
            <span className="color_mode_bt">
              <input id="theme_toggle" type="checkbox" name="theme_toggle" />
              <label htmlFor="theme_toggle"></label>
            </span>
          </li>
          <li>
            <div className={`dropdown user clearfix`}>
              <div className="balance">
                <h5 className="mb-0" style={{ marginTop: "4px" }}>
                  {"@" + props.gamer_name}
                </h5>
              </div>
            </div>
          </li>
          <li>
            <div
              style={{
                boxSizing: "border-box",
                fontFamily: "inherit",
                padding: "2px 6px",
                borderRadius: "3px",
                border: "none",
                color: "white",
                fontSize: "15px",
                backgroundColor: "rgb(255, 0, 113)",
                marginLeft: "10px",
              }}
            >
              {props.gamer_coins} snapps
            </div>
          </li>
        </ul>
        <a href="#0" className="open_close">
          <i className="bi bi-list"></i>
          <span>Menu</span>
        </a>
        <nav className="main-menu">
          <ul>
            <li className="submenu">
              <Link to="/" className="show-submenu">
                Home
              </Link>
            </li>
            <li className="submenu">
              <Link to="/catalog" className="show-submenu">
                Explore
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;