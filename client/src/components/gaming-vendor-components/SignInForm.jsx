import React from "react";
import { Link } from "react-router-dom";

const SignInForm = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendorId = document.getElementById("vendor_id").value;
    const password = document.getElementById("password-signin").value;

    const formData = {
      vendor_id: vendorId,
      vendor_password: password,
    };

    try {
      console.log(formData)
      const response = await fetch(
        `http://localhost:3001/gaming-vendor-auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        toastFunction(data.message);
        if (data.success) {
          window.location.href = '/gaming-vendor-dashboard';
        }
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      toastFunction(error.message);
    }
  };

  function toastFunction(message) {
    const x = document.getElementById("toast");
    x.textContent = message;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  return (
    <form id="register-2" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Vendor ID*"
          name="vendor_id"
          id="vendor_id"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password*"
          name="password-signin"
          id="password-signin"
        />
      </div>
      <div className="text-center form-group">
        <div className="clearfix add_bottom_30">
          <div className="checkboxes float-start">
            <label className="container_check">
              Remember me
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="float-end">
            <Link id="forgot" to="#">
              Forgot Password?
            </Link>
          </div>
        </div>
        <input
          type="submit"
          className="btn_1 medium pulse_bt"
          value="Sign In"
          id="sign-in-btn"
        />
      </div>
    </form>
  );
};

export default SignInForm;
