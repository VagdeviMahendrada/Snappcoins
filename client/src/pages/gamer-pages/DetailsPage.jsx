import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "../../components/gamer-components/Navbar";
import Footer from "../../components/general-components/Footer";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch-gamer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetailsPage() {
  const location = useLocation();
  const { displayData, imageSrc, profilePic  } = location.state;
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const [fetchData, { loading }] = useFetch();
 

  const dispatch = useDispatch();
  const gaming = useSelector((state) => state.gamerReducer);
  const profile = gaming.gamer;
  console.log("details",profile.cartitems)

  //console.log("proff ", profile?._id, profile?.userName);

  //console.log("pd: ", displayData);
  //console.log("i:", imageSrc);

  const [isExtended, setIsExtended] = useState(false);

  const handleReadMore = (e) => {
    e.preventDefault();
    setIsExtended(true);
  };

  const handleReadLess = (e) => {
    e.preventDefault();
    setIsExtended(false);
  };

  //should be called in Add to Cart page

  const handlSnappNow = useCallback(() => {
    const config = {
      url: `http://localhost:3003/api/transactions/gamerCheckout?pid=${displayData?.pid}&gid=${profile?._id}&gname=${profile?.userName}`,
      method: "post",
      headers: { Authorization: token, "Content-Type": "application/json" },
      data: {
        snaps: displayData.price,
        itemsPurchased: 1,
      },
    };

    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        console.log("Gamer checkout sucessfull");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, dispatch, displayData, profile]);

  const handleCart = useCallback((imageSrc) => {
    const config = {
      url: `http://localhost:3004/api/cart/addItem?uid=${profile?._id}&name=${displayData?.title}&price=${displayData?.price}&imageSrc=${imageSrc}`,
      method: "post",
      headers: { Authorization: token},   
    };

    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        toast.success("Item Added To Cart Sucessfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, dispatch, profile]);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
    setShowModal((prevState) => !prevState);
  };

  return (
    <div>

      <Navbar />

      <Modal size="small" isOpen={modal} toggle={toggleModal} style={{marginTop:"10rem"}}>
        <ModalHeader toggle={toggleModal}>
          <b style={{ color: "black" }}>Snap Now!</b>
        </ModalHeader>
        <ModalBody>
          <form method="POST">
            <div className="modal-body">
              <p style={{ color: "black" }}>
                You are about to purchase <b>{displayData?.title}</b><b>#304</b> from{" "}
                <b>{displayData?.brand}</b>
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
                value={`${displayData?.price}`} disabled
              />
              <ul style={{ listStyle: "none", color: "black" }}>
                <li>
                  Your balance
                  <span style={{ marginLeft: "14rem" }}>
                     {profile.walletMoney}
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
                state={{ displayData, imageSrc }}
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
                  onClick={() => handleCart(imageSrc)}
                >
                   Add To Cart <i class="bi bi-cart"></i>
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

      <main style={{ transform: "none" }}>
        <div className="container" style={{ transform: "none" }}>
          <div className="row" style={{ transform: "none" }}>
            <div
              className="col-xl-8 col-lg-7 margin_detail"
              style={{
                zIndex: 2,
                position: "relative",
                // marginRight: "400px",
              }}
            >
              <div className="box_general" style={{ alignContent: "center" }}>
                <img
                  src={`http://localhost:3004/${imageSrc}`}
                  alt=""
                  className="img-fluid"
                  style={{
                    height: "500px",
                    marginLeft: "6rem",
                    marginRight: "2rem",
                    marginTop: "2rem",
                    width:"650px"
                  }} // Set the width of the image to 100%
                />
                <div className="main_info_wrapper">
                  <div className="main_info">
                    <div className="clearfix mb-3">
                      <div className="item_desc">
                        <div className="mb-3">
                          <a href="" className="author">
                            <div className="author_thumb veryfied">
                              <i className="bi bi-check"></i>
                              <figure>
                                <img
                                  src={`http://localhost:3004/${imageSrc}`}
                                  data-src="img/avatar1.jpg"
                                  alt=""
                                  className="lazy loaded"
                                  width="100"
                                  height="100"
                                  data-was-processed="true"
                                />
                              </figure>
                            </div>
                            <h6 className="ms-1">
                              <span>Brand</span>
                              {displayData?.brand}
                            </h6>
                          </a>
                        </div>
                      </div>
                      <div className="score_in">
                        123 Likes{" "}
                        <a href="#" className="wish_bt">
                          <i className="bi bi-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h1 className="mb-md-2">
                      {displayData?.brand} | {displayData?.title}
                    </h1>
                    <p style={{ color: "#666" }}>
                      {displayData?.desc}
                      {isExtended ? (
                        <span>
                          <br />
                          <br />
                          <span style={{ color: "#777" }}></span>
                          <br />
                          <br />
                          <a href="#" onClick={handleReadLess}>
                            Read Less
                          </a>
                        </span>
                      ) : (
                        <a href="#" onClick={handleReadMore}>
                          <br />
                          <br />
                          <span>Read More</span>
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-5 sticky-sidebar"
              id="sidebar_fixed"
              style={{
                boxSizing: "border-box",
                minHeight: "1px",
                position: "relative",
                zIndex: 2,
                marginLeft: "-00px",
              }}
            >
              <div
                className="theiaStickySidebar"
                style={{
                  paddingTop: "0px",
                  paddingBottom: "1px",
                  position: "fixed",
                  transform: "translateY(135px)",
                  // left: "1000.2px",
                  top: "0px",
                  width: "376px",
                }}
              >
                <div className="box_bid">
                  <h2>{displayData?.title}</h2>
                  <a href="#0" className="close_panel_mobile">
                    <i className="icon_close"></i>
                  </a>
                  <div className="item_meta">
                    <h3>
                      Redeem With
                      <br /> <strong>{displayData?.price} Snapps</strong>
                    </h3>
                    <p className="countdown_in">
                      Ends in
                      <br />
                      <strong data-countdown="2022/03/15">00D 00:00:00</strong>
                    </p>
                  </div>
                  <hr />{" "}
                  <button
                    className="btn_1 full-width mb-2 modal_popup"
                    onClick={toggleModal}
                  >
                    Snapp Now!
                  </button>
                </div>
                <ul className="share-buttons">
                  <li>
                    <a href="#0">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </li>
                </ul>
                <div
                  className="resize-sensor"
                  style={{
                    position: "absolute",
                    inset: "0px",
                    overflow: "hidden",
                    zIndex: "-1",
                    visibility: "hidden",
                  }}
                >
                  <div
                    className="resize-sensor-expand"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      overflow: "hidden",
                      zIndex: -1,
                      visibility: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        transition: "all 0s ease 0s",
                        width: "386px",
                        height: "485px",
                      }}
                    ></div>
                  </div>
                  <div
                    className="resize-sensor-shrink"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      overflow: "hidden",
                      zIndex: -1,
                      visibility: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        transition: "0s",
                        width: "200%",
                        height: "200%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
