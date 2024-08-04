import React from "react";
import { Link } from "react-router-dom";

import ProfilePicture from "./ProfilePicture";
import ProfilePictureUpload from "./ProfilePictureUpload";

const UserProfile = (props) => {
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
            window.location.href = "/gaming-vendor-login";
          } else {
            throw new Error("Log out unsuccessful");
          }
        });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="col-lg-3">
      <div className="main_profile edit_section">
      <div className="author">
  <div className="author_thumb veryfied">
    <i className="bi bi-check" />
    <figure>
    {props.page === "dashboard" ? (
              <ProfilePicture vendorId={props.id} />
            ) : (
              <ProfilePictureUpload vendorId={props.id} />
            )}
    </figure>
  </div>
</div>

        
        <h1 id="vendor_name">
          {props.name} <br />
          <br />
          <span
            className="bg-violet"
            style={{
              padding: "10px 15px",
              fontSize: "17px",
              borderRadius: "2px",
            }}
          >
            {props.snappcoins}
            <> Snapps</>
          </span>
        </h1>
        <ul>
          <li>
            <Link
              to="/gaming-vendor-dashboard"
              className={props.page === "dashboard" ? "active" : ""}
            >
              <i className="bi bi-file-earmark-arrow-up" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/gaming-vendor-settings"
              id="account-settings"
              className={props.page === "settings" ? "active" : ""}
            >
              <i className="bi bi-gear" />
              Account settings
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogOut}>
              <i className="bi bi-box-arrow-right" />
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
