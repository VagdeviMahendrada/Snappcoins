/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch-gamer";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [fetchData, { loading }] = useFetch();
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
        localStorage.setItem("verify", true);
        localStorage.removeItem("token");
        navigate("/gamer-verify", {
          state: { id: data.userId, email: data.email },
        });
      })
      .catch((error) => {
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
              <div className="access_social">
                <a href="#0" className="social_bt facebook">
                  Register with Facebook
                </a>
                <a href="#0" className="social_bt google">
                  Register with Google
                </a>
              </div>
              <div className="divider">
                <span>Or</span>
              </div>
              <div class="form-group mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="User Name"
                  name="userName"
                  value={formData.userName}
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
                  type="text"
                  class="form-control"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Confirm Password"
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
                  <Link to="/gamer-login">Sign In</Link>
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
*/
import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';

import useFetch from "../../hooks/useFetch-gamer";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
    country: "", // New field for country
  });

  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();
  
  const [showFacebookLogin, setShowFacebookLogin] = useState(false);

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
        localStorage.setItem("verify", true);
        localStorage.removeItem("token");
        navigate("/gamer-verify", {
          state: { id: data.userId, email: data.email },
        });
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const responseFacebook = (response) => {
    console.log(response);
    // Previous state
    window.location.reload();
  }

  const componentClicked = () => {
    setShowFacebookLogin(true);
  };

  return (
    <>
      <div id="register_bg">
        <div id="login">
          <aside>
            <figure>
              <a href="/" className="logo_account">
                <img
                  src="assets/img/logo.svg"
                  alt=""
                  width="140"
                  height="35"
                  className="dark"
                />
              </a>
            </figure>
            <form autoComplete="off">
              <div className="access_social">
              <a className="social_bt facebook" onClick={(e)=>{
                e.preventDefault();
                componentClicked()}}>
                Register with Facebook
              </a>
              <div style={{display:'none'}}>
                {showFacebookLogin && (
                  <FacebookLogin
                    appId="916766683461980"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={() => {}}
                    callback={responseFacebook} 
                    redirectUri="/gamer-dashboard"
                  />
                  )}
              </div>
                <a href="#0" className="social_bt google">
                  Register with Google
                </a>
              </div>
              <div className="divider">
                <span>Or</span>
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="User Name"
                  name="userName"
                  value={formData.userName}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password1"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
              </div>
              {/* Country Dropdown */}
              <div className="form-group mb-3">
                <select
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your country</option>
                  <option value="CANADA" style={{ color: "black" }}>Canada</option>
                  <option value="INDIA" style={{ color: "black" }}>India</option>
                  <option value="USA" style={{ color: "black" }}>United Sates of America</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              <div id="pass-info" className="clearfix"></div>
              <Link
                to="#0"
                className="btn_1 rounded full-width"
                onClick={handleSubmit}
              >
                Register Now!
              </Link>
              <div className="text-center add_top_10">
                Already have an account?{" "}
                <strong>
                  <Link to="/gamer-login">Sign In</Link>
                </strong>
              </div>
            </form>
            <div className="copy">
              © 2023 <a href="/">Snappcoins</a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Signup;

