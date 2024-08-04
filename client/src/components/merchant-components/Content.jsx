import React, { useCallback, useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import useFetch from "../../hooks/useFetch-merchant";
import MerchandiseForm from "./MerchandiseForm";
import ToggleSide from "./ToggleSide";
import EditProd from "./EditProd";
import { useDispatch } from "react-redux";
import { merchantProfile } from "../../redux/actions/merchantAction";
import Hero from "../gaming-vendor-components/Hero";
import FullpageLoader from "../general-components/FullpageLoader";

const Content = () => {
  const [user, setUser] = useState();
  const [change, setChange] = useState(0);

  const dispatch = useDispatch();

  const token = localStorage.getItem("merchant-token");
  console.log(token)
  const [fetchData] = useFetch();

  const fetchUser = useCallback(() => {
    const config = {
      url: "/profile",
      method: "get",
      headers: { Authorization: token },
    };
    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setUser(data.user);
        dispatch(merchantProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, change]);

  const handleSubmit = (e) => {
    setChange((prev) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <Hero />
      <div className="container margin_30_40">
        {user ? (
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6">
              <ProfileCard
                merchantName={user.companyName}
                walletMoney={user.walletMoney}
                memberSince={user.joiningTime}
                redeemed={user.redeemed}
                image={user.image}
              />
            </div>
            <div className="col-lg-9 ps-lg-5">
              <ToggleSide key={user._id} userId={user._id} change={change} />
              <MerchandiseForm userId={user._id} onFormSubmit={handleSubmit} />
              <EditProd onEditForm={handleSubmit} />
            </div>
          </div>
        ): <FullpageLoader />}
      </div>
    </div>
  );
};

export default Content;
