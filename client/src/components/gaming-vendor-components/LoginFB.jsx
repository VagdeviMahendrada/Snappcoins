// Import necessary React components
import React, { useState } from 'react';
import { navigate } from '@reach/router'; // Import the navigate function from Reach Router

// Define the Login component
const Login = () => {
  // State to store user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle the click on the login button
  const handleLoginClick = () => {
    // Redirect the user to the Facebook authentication page on your server
    const callbackUrl = 'http://localhost:3000/callback'; // Change this to your actual callback URL
    window.location.href = `http://localhost:3000/auth/facebook?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  };

  // Function to handle the click on the logout button
  const handleLogoutClick = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect the user to the "/signin" route
    navigate("/signin");
  };

  // Function to handle the click on the custom Facebook login button
  const handleFacebookLoginClick = (event) => {
    // Prevent the default link behavior
    event.preventDefault();






    
    // Trigger the Facebook login functionality
    handleLoginClick();
  };

  // Render the login page
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <div>
          {/* Use the provided <a> tag with the onClick handler and blue color for Facebook login */}
          <a
            href="#0"
            onClick={handleFacebookLoginClick}
            className="social_bt google"
            style={{ backgroundColor: '#1877f2', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
          >
            Login with Facebook 
          </a>
        </div>
      )}
    </div>
  );
};

// Export the Login component
export default Login;