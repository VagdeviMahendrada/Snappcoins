import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendorName = document.getElementById("name_register").value;
    const vendorEmail = document.getElementById("email_register").value;
    const vendorPassword = document.getElementById("password").value;
    const vendorConfirmPassword = document.getElementById("confirm_password").value;
    const vendorWebsite = document.getElementById("website").value;

    const formData = {
      vendor_name: vendorName,
      vendor_email: vendorEmail,
      vendor_password: vendorPassword,
      vendor_confirm_password: vendorConfirmPassword,
      vendor_website: vendorWebsite,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/gaming-vendor-auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          navigate("/gaming-vendor-register", {
            state: { companyName: vendorName, email: vendorEmail, vendorId: data.vendor_id },
          });
        });
      } else {
        const data = await response.json();
        throw new Error(JSON.stringify(data.errors));
      }
    } catch (error) {
      console.log(error);
      const errorMessages = JSON.parse(error.message);
      clearErrorMessages();
      errorMessages.forEach((errorMessage, index) => {
        toastFunction(errorMessage);
      });
    }
  };

  const toastFunction = (message) => {
    const x = document.getElementById("toast");
    x.textContent = message;
    x.className = "show";
    setTimeout(() => {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const clearErrorMessages = () => {
    const errorDivs = document.getElementsByClassName("error-message");
    for (let i = 0; i < errorDivs.length; i++) {
      errorDivs[i].textContent = "";
    }
  };

  return (
    <form id="register-1" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Company Name*"
          name="vendor_name"
          id="name_register"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Email Address*"
          name="vendor_email"
          id="email_register"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password*"
          name="password"
          id="password"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password*"
          name="confirm_password"
          id="confirm_password"
        />
      </div>
      <div className="form-group">
        <input
          type="url"
          className="form-control"
          placeholder="Website*"
          name="website"
          id="website"
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
          value="Join Now"
          id="join-now-btn"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
