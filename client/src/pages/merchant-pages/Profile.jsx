import React from 'react';

import Header from '../../components/merchant-components/Header';
import Footer from '../../components/general-components/Footer';
import EditProfile from '../../components/merchant-components/EditProfile';
import ProfileNav from '../../components/merchant-components/ProfileNav';

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="container">
      <div className="card-body">
        <div className="row">
            <ProfileNav />
            <EditProfile />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
