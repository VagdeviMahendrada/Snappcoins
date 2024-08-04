import React, { useState, useEffect, useCallback } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Loader from "./utils/Loader";
import useFetch from "../../hooks/useFetch-gamer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Recommended(props) {
  console.log("propsRR ", props);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //const [location,setLocation] = useState(null)

  const [user, setUser] = useState();

  const token = localStorage.getItem("token");
  const [fetchData, { loading }] = useFetch();

  const [ProfPicLoaded, setProfPicLoaded] = useState(false);
  const [ProfilePic, setProfilePic] = useState("");
  useEffect(() => {
    // Assuming you receive the image URL from props

    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3002/api/getprofile${props.userid}`
        );
        const imgsrc = response.data.user.image;
        console.log(imgsrc);
        setProfilePic(
          imgsrc
            ? `http://127.0.0.1:3002/api/img${imgsrc}`
            : "assets/img/items/default-prof.png"
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetch();

    setImageSrc(
      props.img
        // ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/merchant/img/${props.img}`
        // : "assets/img/default-prod.png"
        ? `api/merchant/img/${props.img}`
        : "assets/img/default-prod.png"
    );
    setImageLoaded(false);
  }, [props.img, props.profpic, ProfilePic]);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
    setShowModal((prevState) => !prevState);
  };

  const displayData = {
    title: props.title,
    pid: props.pid,
    desc: props.desc,
    brand: props.brand,
    price: props.price,
    profilePic: ProfilePic,
  };

  const fetchUser = useCallback(() => {
    const config = {
      url: "/profile",
      method: "get",
      headers: { Authorization: token },
    };
    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setUser(data.user);
        console.log("data is: ", data);
        // dispatch(gamerProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token]);

  useEffect(() => {
    fetchUser();

  }, [fetchUser]);


  return (
    <div className="strip" style={{ padding: "0px", margin: "0px" }}>
      <Modal size="small" isOpen={modal} toggle={toggleModal} style={{ marginTop: "10rem" }}>
        <ModalHeader toggle={toggleModal}>
          <b style={{ color: "black" }}>Snap Now! edited </b>
        </ModalHeader>
        <ModalBody>
          <form method="POST">
            <div className="modal-body">
              <p style={{ color: "black" }}>
                You are about to purchase <b>{props.title}</b> <b>#304</b> from{" "}
                <b>{props.brand}</b>
              </p>
              <p>
                <b
                  style={{ margin: "0px", color: "black", paddingLeft: "16px" }}
                >
                  Redeem with
                </b>
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="3.5 Snapps"
                style={{
                  width: "100%",
                  color: "black",
                  marginTop: "-20px",
                  marginBottom: "1rem",
                }}
                value={`${props.price}`} disabled
              />
              <ul style={{ listStyle: "none", color: "black" }}>
                <li>
                  Your balance{" "}
                  <span style={{ marginLeft: "14rem" }}>
                    {user && user.walletMoney}
                  </span>
                </li>
                <li>
                  Service fee 1.5%
                  <span style={{ marginLeft: "13rem" }}>0.125 Snapps</span>
                </li>
              </ul>
            </div>
            <div className="modal-footer justify-content-center">
              <Link
                to="/details-page"
                state={{ displayData, imageSrc, profilePic: ProfilePic, }}
                style={{ width: "100%" }}
              >
                <button
                  type="button"
                  className="btn"
                  style={{
                    width: "100%",
                    background: "#ff0071",
                    color: "white",
                  }}
                >
                  Snap It!
                </button>
              </Link>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{ width: "100%", background: "black", color: "white" }}
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <figure>
        
        {props.featured && <div className="ribbon">
          <span>Featured</span>
        </div>}
        {!imageLoaded && (
          <div className="text-center">
            <Loader />
          </div>
        )}
        { imageLoaded && 
          <a
          href="#modal-dialog"
          className="btn_1 modal_popup"
          onClick={toggleModal}
        >
          Snapp Now!
        </a>
        }


        <img
          src={`http://localhost:3004/${imageSrc}`}
          style={{ width: "533", height: "400" }}
          data-src="img/items/item-4.jpg"
          className={`lazy ${imageLoaded ? "" : "hidden"}`}
          alt=""
          height="50px"
          width="100%"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
        <a href="#modal-dialog" className="strip_info" onClick={toggleModal}>
          <div className="item_title">
            <span className="badge" style={{ "background-color": "#FF1493" }}>
              {props.price} Snapps
            </span>
          </div>
        </a>
      </figure>
      <ul>
        <li>
          <div
            className="author_thumb verified"
            style={{ display: "flex", alignItems: "center" }}
          >
            <figure style={{ position: "relative" }}>
              <img
                src={ProfilePic}
                data-src="img/avatar2.jpg"
                alt=""
                className={`lazy ${ProfPicLoaded ? "" : "visually-hidden"}`}
                style={{ width: "25px", height: "25px", borderRadius: "5px" }}
                onLoad={() => setProfPicLoaded(true)}
                onError={() => setProfPicLoaded(false)}
              />
              <i
                className="bi bi-check"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  position: "absolute",
                  bottom: "-7px",
                  right: "-5px",
                  borderRadius: "80%",
                  zIndex: "2",
                  fontSize: "12px", // Adjust the font size as desired
                }}
              ></i>
            </figure>


            <h6>&nbsp;&nbsp;{props.title}</h6>
          </div>
        </li>

        <li>
          <a href="#0" className="wish_bt">
            <i className="bi bi-heart-fill"></i>
            <div style={{ color: "white" }}>50</div>
          </a>
        </li>
      </ul>
    </div>
  );
}
