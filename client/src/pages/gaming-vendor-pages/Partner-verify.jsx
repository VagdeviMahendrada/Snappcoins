import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch-merchant";

const Verify = () => {
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [visible, setVisibility] = useState(false);
  const location = useLocation();
  const { id, email } = location.state;
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { value, id } = e.target;
    const nextInput = parseInt(id.substring(3)) + 1;
    setOtp((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    const nextInputElement = document.querySelector(`#otp${nextInput}`);
    if (nextInputElement && value.length === e.target.maxLength) {
      nextInputElement.focus();
    }
  };

  const handlesendOtp = async (e) => {
    e.preventDefault();
    const config = { url: "/auth/getotp", method: "post", params: { uid: id } };
    fetchData(config)
      .then()
      .catch((err) => {
        console.log(err);
      });
    setVisibility(true);
    setOtp("");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const finalOtp = Object.values(otp).join("");
    const config = {
      url: "/auth/verifyotp",
      method: "post",
      params: { uid: id, otp: finalOtp },
    };
    fetchData(config)
      .then(() => {
        localStorage.removeItem("verify");
        token ? navigate("/merchant-dashboard") : navigate("/merchant-login");
      })
      .catch((err) => {
        console.log(err);
        navigate("/merchant-verify", { state: { id, email } });
      });
    setOtp("");
    setVisibility(false);
  };

  return (
    <>
      <div>
        <div className="d-flex container mt-5 align-items-center justify-content-center otp-verify">
          <div className="card text-center text-dark mt-5 py-5 px-3 otp-card">
            <div className="container-fluid">
              {token ? (
                <p className="fs-1">2 Step Verification</p>
              ) : (
                <p className="fs-1">Email Verification</p>
              )}
            </div>
            <div className="container-fluid">
              {token ? (
                <p className="fs-5 ">
                  Enter the OTP that have been sent to your Email {email}!
                </p>
              ) : (
                <p className="fs-5 "> Verify your email {email}!</p>
              )}
            </div>

            {!visible && (
              <div className="container-fluid my-4">
                <button
                  className="btn btn-success mr-0"
                  onClick={handlesendOtp}
                >
                  Send OTP
                </button>
              </div>
            )}
            {visible && (
              <form action="/" method="post" onSubmit={handleVerifyOtp}>
                <div className="container-fluid d-flex flex-row justify-content-center align-items-center ">
                  <input
                    type="text"
                    maxLength="1"
                    id="otp1"
                    value={otp.otp1 || ""}
                    className="form-control input1 text-dark"
                    required
                    autoComplete="new"
                    autoFocus
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    id="otp2"
                    value={otp.otp2 || ""}
                    className="form-control input1 text-dark"
                    required
                    autoComplete="new"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    id="otp3"
                    value={otp.otp3 || ""}
                    className="form-control input1 text-dark"
                    required
                    autoComplete="new"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    id="otp4"
                    value={otp.otp4 || ""}
                    className="form-control input1 text-dark"
                    required
                    autoComplete="new"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    id="otp5"
                    value={otp.otp5 || ""}
                    className="form-control input1 text-dark"
                    required
                    autoComplete="new"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    id="otp6"
                    value={otp.otp6 || ""}
                    className="form-control input1 text-dark"
                    required
                    autoComplete="new"
                    onChange={handleChange}
                  />
                </div>
                <div className="container-fluid my-4">
                  <button className="btn btn-primary">Verify OTP</button>
                </div>
                <div className="container-fluid my-4 text-center">
                  <p className="fs-6">Didn't receive any OTP?</p>
                  <button className="btn btn-primary" onClick={handlesendOtp}>
                    Resend
                  </button>
                </div>
                <div className="container-fluid">
                  <small>
                    {" "}
                    <i className="fa-solid fa-check mx-1 text-success"></i>OTP
                    sent successfully!{" "}
                  </small>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
