import React from "react";
import { Link } from "react-router-dom";

const ProfileNav = () => {
  return (
    <div className="col-3 shadow-lg p-3 mb-5 bg-black rounded me-4">
      <h3>Contents</h3>
      <h4 className="text-muted">________</h4>
      <h4>
        <Link to="#">Profile</Link>
      </h4>
      <h4>
        <Link to="#">Account</Link>
      </h4>
      <h4>
        <Link to="#">Accessibility</Link>
      </h4>
      <h4 className="text-muted">________</h4>
      <h4>
        <Link to="#">Access</Link>
      </h4>
      <h4>
        <Link to="#">Email</Link>
      </h4>
      <h4>
        <Link to="#">Password</Link>
      </h4>
    </div>
  );
};

export default ProfileNav;
