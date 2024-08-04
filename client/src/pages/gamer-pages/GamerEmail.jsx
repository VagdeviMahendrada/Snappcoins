import React, { useState } from 'react'
import './css/Gameremail.css'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch-gamer';

const GamerEmail = () => {

    const navigate = useNavigate();
  const [fetchData] = useFetch();

    const [email,setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        const config = { url: `/auth/search-email`, method: "post", data: {email:email }};
        fetchData(config)
          .then((data) => {
            console.log(data)
            localStorage.setItem("verify", true);
            navigate("/gamer-verify", {
              state: { id: data.user._id, email: data.user.email ,forgotpassword:true },
            });
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          });
      };
  return (
    <div className="email-form-container">
            <div className="email-form-box">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="email-input"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="send-button" onClick={handleSubmit}>Send</button>
            </div>
        </div>
  )
}

export default GamerEmail
