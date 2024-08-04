import React, { useState } from 'react';
import './css/GamerForgotPassword.css'; // Import your CSS file for styling
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch-gamer';
const GamerForgotPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fetchData] = useFetch();
  const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation or submission logic here
        const config = { url: `/auth/forgotpassword`, method: "post", data: {password:newPassword,id} };
    fetchData(config)
      .then((data) => {
        navigate("/gamer-login");
      })
      .catch((error) => {
        // Handle the error here, e.g., log the error or display an error message
        console.error("Error fetching tasks:", error);
      });
        console.log('Submitted:', newPassword, confirmPassword);
    }

    return (
        <div className="password-form-container">
            <form onSubmit={handleSubmit} className="password-form-box">
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="password-input"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="password-input"
                />
                <button type="submit" className="confirm-button">Confirm</button>
            </form>
        </div>
    );
}

export default GamerForgotPassword;
