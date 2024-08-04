import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const LoginForm = () => {
  const [showSignUp, setShowSignUp] = useState(true);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <div className="access_social" style={{ display: "flex", justifyContent: "space-between" }}>
        <a href="#0" className="social_bt facebook">
          Login with Facebook
        </a>
        <a href="#0" className="social_bt google">
          Login with Google
        </a>
      </div>
      <div className="divider">
        <span>Or</span>
      </div>
      {showSignUp ? <SignUpForm /> : <SignInForm />}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {showSignUp ? (
          <div id="toggle-text">
            Already a <a href="../html/index.html"> SnappCoins </a> partner?
          </div>
        ) : (
          <div id="toggle-text">
            Not a <a href="../html/index.html"> SnappCoins </a> partner?
          </div>
        )}
        <button
          onClick={toggleForm}
          type="button"
          id="toggle-btn"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#47e0a3",
          }}
        >
          {showSignUp ? "Sign In" : "Join Now"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(LoginForm);
