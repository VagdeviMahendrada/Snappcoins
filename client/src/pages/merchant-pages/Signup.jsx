import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch-merchant";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    companyName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    role: "",
    address: "",
  });

  const [fetchData] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { url: `/auth/register`, method: "post", data: formData };
    fetchData(config)
      .then((data) => {
        console.log(data.userId);
        localStorage.setItem("verify", true);
        navigate("/merchant-verify", {
          state: { id: data.userId, email: data.email },
        });
      })
      .catch((error) => {
        // Handle the error here, e.g., log the error or display an error message
        console.error("Error fetching tasks:", error);
      });
  };

  return (
    <>
      <div id="register_bg">
        <div id="login">
          <aside>
            <figure>
              <a href="/" class="logo_account">
                <img
                  src="assets/img/logo.svg"
                  alt=""
                  width="140"
                  height="35"
                  class="dark"
                />
              </a>
            </figure>
            <form autocomplete="off">
              <div class="form-group mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  autoComplete="off"
                  onChange={handleChange}
                />
                <i class="icon_pencil-edit"></i>
              </div>
              <div class="form-group mb-3">
                <input
                  class="form-control"
                  type="password"
                  id="password1"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group mb-3">
                <input
                  class="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div id="pass-info" class="clearfix"></div>
              <Link
                to="#0"
                class="btn_1 rounded full-width"
                onClick={handleSubmit}
              >
                Register Now!
              </Link>
              <div class="text-center add_top_10">
                Already have an acccount?{" "}
                <strong>
                  <Link to="/merchant-login">Sign In</Link>
                </strong>
              </div>
            </form>
            <div class="copy">
              © 2023 <a href="/">Snappcoins</a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Signup;
