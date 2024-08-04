import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

const Dropdown = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    try {
      fetch(`${process.env.REACT_APP_GAMING_VENDOR_API}/gaming-vendor-auth/logout`, {
        credentials: "include",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            window.location.href = '/gaming-vendor-login';
          } else {
            throw new Error("Log out unsuccessful");
          }
        });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleSettings = () => {
    navigate("/gaming-vendor-settings");
  };

  const handleDashboard = () => {
    navigate("/gaming-vendor-dashboard");
  };

  return (
    <div className={`dropdown user clearfix ${isOpen ? "show" : ""}`}>
      <a
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <figure>
          <ProfilePicture vendorId={props.id} />
        </figure>
        <div className="balance">
          <h6 className="mb-0">{props.name}</h6>
          <span>{props.snappcoins} Snapps</span>
        </div>
      </a>
      <div
        className={`dropdown-menu dropdown-menu-end animate ${
          isOpen ? "fadeIn show" : ""
        }`}
      >
        <div className="dropdown-menu-content">
          <figure>
            <img
              src={"assets/img/cover_small.jpg"}
              alt=""
              width="300"
              height="138"
            />
          </figure>
          <ul>
            <li>
              <a href="#" onClick={handleDashboard}>
                <i className="bi bi-file-earmark-arrow-up"></i>Dashboard
              </a>
            </li>
            <li>
              <a href="#" onClick={handleSettings}>
                <i className="bi bi-gear"></i>Account settings
              </a>
            </li>
            <li>
              <a href="/" onClick={handleLogOut}>
                <i className="bi bi-box-arrow-right"></i>Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
