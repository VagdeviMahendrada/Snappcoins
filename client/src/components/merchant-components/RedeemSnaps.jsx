import React from "react";
import { Link } from "react-router-dom";

const RedeemSnaps = () => {
  return (
    <div className="row mt-lg-5 mt-3 ">
        <div className="main_title version_2">
          <span>
            <em />
          </span>
          <h2 className="d-flex align-items-left">Redeem Snappcoins</h2>
        </div>
        <div className="row">
          <div>
            <div className="form-group">
              <label className="d-flex align-items-left">Enter Snapps</label>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "65%", marginRight: "2rem" }}
                  type="text"
                  className="form-control"
                  placeholder={100}
                  id="order-price"
                  // onChange={handleInputChange}
                />
                <button
                  className="btn_1 medium pulse_bt"
                  id="payment"
                  // onClick={makePayment}
                >
                  Continue to Payment Gateway
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-3 mb-5" />
        {/* <h6>Notifications</h6>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group switch_wrapper">
              <label>Set Reminders</label>
              <p className="mb-0" style={{ color: "white" }}>
                Notify me when my Snappcoins are depleted
              </p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  defaultChecked="checked"
                />
              </div>
            </div>
          </div>
        </div> */}
        {/* /row */}
        <div className="text-center form-group">
          <div
            id="error-message"
            className="error-message"
          ></div>
          <div id="toast" className="center">
            <div className="checkicon">
              <i className="fas fa-check-square" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default RedeemSnaps;
