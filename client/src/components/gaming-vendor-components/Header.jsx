import React from "react";
import Dropdown from "./Dropdown";

const Header = (props) => {
  return (
    <header className="header_in clearfix element_to_stick">
      <div className="layer"></div>
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
              src="./../assets/img/logo-light-mode.svg"
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
              <input id="theme_toggle" type="checkbox" name="theme_toggle" />
              <label htmlFor="theme_toggle"></label>
            </span>
          </li>
          <li>
            <Dropdown
              name={props.name}
              id={props.id}
              snappcoins={props.snappcoins}
            />
          </li>
        </ul>
        <a href="#0" className="open_close">
          <i className="bi bi-list"></i>
          <span>Menu</span>
        </a>
        <nav className="main-menu">
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
    </header>
  );
};

export default Header;
