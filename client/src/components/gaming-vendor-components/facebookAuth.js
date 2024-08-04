import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'; // Corrected import statement

const App = () => {
  const responseFacebook = (response) => {
    if (response.status !== 'connected') {
      console.log('User is not connected.');
      // Handle the case where the user is not connected to your app
    } else {
      console.log('Facebook authentication response:', response);
      // Handle the case where the user is successfully authenticated
    }
  };

  const handleError = (error) => {
    console.error('Facebook authentication error:', error);
    // Handle errors occurred during authentication
  };

  return (
    <div>
      <h1>React Facebook Authentication</h1>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        onFailure={handleError}
      />
    </div>
  );
};

export default App;
