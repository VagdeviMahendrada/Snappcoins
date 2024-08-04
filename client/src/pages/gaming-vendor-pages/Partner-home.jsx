import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import UserProfile from "../../components/gaming-vendor-components/UserProfile.jsx";
import Hero from "../../components/gaming-vendor-components/Hero.jsx";
import Header from "../../components/gaming-vendor-components/Header.jsx";
import Footer from "../../components/general-components/Footer.jsx";
import TransactionHistory from "../../components/gaming-vendor-components/TransactionHistory.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState("");
  const [vendor_name, setVendorName] = useState("");
  const [vendor_snappcoins, setVendorSnappcoins] = useState("");
  const [snappcoinsToPurchase, setSnappcoinsToPurchase] = useState("");
  const [keyword, setKeyword] = useState("");

  const verifyUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/gaming-vendor-auth/verify-user",
        {
          credentials: "include",
        }
      );
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data.success) {
          setVendorId(data.vendor_id);
          const response = await fetch(
            `http://localhost:3001/gaming-vendor-wallet/snappcoin-counter/${data.vendor_id}`
          );
          console.log(response)
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setVendorName(data.vendor_name);
            setVendorSnappcoins(data.vendor_coins);
          } else {
            throw new Error("Error occurred while fetching vendor details");
          }
        } else {
          navigate("/gaming-vendor-login");
        }
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyUser();
  });

  const handleInputChange = (event) => {
    setSnappcoinsToPurchase(event.target.value);
  };

  const makePayment = async () => {
    let quantity = 0;
    if (snappcoinsToPurchase.valueOf() !== "") {
      quantity = parseInt(snappcoinsToPurchase.valueOf());
      if (!Number.isInteger(quantity)) {
        toastFunction("Please enter a valid number of Snappcoins to purchase");
        return;
      }
      if (quantity < 1) {
        toastFunction("You have to purchase at least 1 Snappcoin");
        return;
      }
    } else {
      toastFunction("Please enter a valid number of Snappcoins to purchase");
      return;
    }

    // Fetching new transactionId
    fetch(
      "http://localhost:3001/gaming-vendor-transactions/get-new-transactionId"
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(function (data) {
        var transactionId = data.transactionId;
        const transactionDate = new Date();
        const transaction_object = {
          vendor_id: vendorId,
          vendor_name: vendor_name,
          transaction_id: transactionId,
          transaction_status: "pending",
          transaction_date: transactionDate,
          snappcoin_count: quantity,
        };

        // Making two fetch calls with transactionId in the body
        var fetch1 = fetch(
          "http://localhost:3001/gaming-vendor-transactions/add-transaction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction_object),
          }
        );

        const snappcoin_bank_object = {
          vendor_id: vendorId,
          vendor_name: vendor_name,
          transaction_id: transactionId,
          transaction_status: "pending",
          transaction_date: transactionDate,
          snappcoins_purchased: quantity,
          user_persona: "gaming_vendor",
        };
        var fetch2 = fetch("http://localhost:3001/snappcoin-bank/update-bank", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(snappcoin_bank_object),
        });

        const formData = {
          snappCoinsToPurchase: quantity,
          vendor_id: vendorId,
          transaction_id: transactionId,
          successUrl: "http://localhost:3000/gaming-vendor-dashboard",
          failureUrl: `http://localhost:3000`,
        };

        // Run both fetch calls or none at all
        Promise.all([fetch1, fetch2])
          .then(function (responses) {
            // Check if both fetch calls were successful
            if (
              responses.every(function (response) {
                return response.ok;
              })
            ) {
              fetch(
                "http://localhost:3001/gaming-vendor-wallet/create-checkout-session",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                }
              )
                .then(async (response) => {
                  console.log(response)
                  const { session } = await response.json();
                  console.log(session)
                  
                  const url = session.url;
                  window.location.href = url.toString();
                  // const res = window.open(url, '_blank');
                  // console.log(res)
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              throw new Error("One or more fetch calls failed.");
            }
          })
          .catch(function (error) {
            console.log("Error:", error.message);
          });
      })
      .catch(function (error) {
        console.log("Error:", error.message);
      });

    function toastFunction(message) {
      const x = document.getElementById("toast");
      x.textContent = message;
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
  };

  const handleSearch = () => {
    const search_term = document.getElementById("search").value;
    setKeyword(search_term);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Snappcoins - Ready , Steady, Snapp!" />
      <meta name="author" content="Snappcoins" />
      <title>Snappcoins - Ready , Steady, Snapp!</title>

      {/* <FullpageLoader /> */}
      <Header name={vendor_name} id={vendorId} snappcoins={vendor_snappcoins} />

      <main>
        <Hero />

        <div className="container margin_30_40">
          <div className="row justify-content-center">
            <UserProfile
              page={"dashboard"}
              name={"@" + vendor_name}
              id={vendorId}
              snappcoins={vendor_snappcoins}
            />
            <div className="col-lg-9 ps-lg-5">
              <div className="tabs_detail">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      id="tab-A"
                      href="#pane-A"
                      className="nav-link active"
                      data-bs-toggle="tab"
                      role="tab"
                    >
                      Buy Snappcoins
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      id="tab-B"
                      href="#pane-B"
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                    >
                      Purchase History
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      id="tab-C"
                      href="#pane-C"
                      className="nav-link"
                      data-bs-toggle="tab"
                      role="tab"
                    >
                      My Games
                    </a>
                  </li>
                </ul>
                <div className="tab-content" role="tablist">
                  <div
                    id="pane-A"
                    className="card tab-pane fade show active"
                    role="tabpanel"
                  >
                    <div className="card-header" role="tab" id="heading-A">
                      <h5>
                        <a
                          className="collapsed"
                          data-bs-toggle="collapse"
                          href="#collapse-A"
                        >
                          Buy SnappCoins
                        </a>
                      </h5>
                    </div>
                    <div id="collapse-A" className="collapse" role="tabpanel">
                      <div className="row mt-lg-5 mt-3">
                        <div className="main_title version_2">
                          <span>
                            <em />
                          </span>
                          <h2>Buy Snappcoins</h2>
                        </div>
                        <div className="row">
                          <div>
                            <div className="form-group">
                              <label>Enter Amount</label>
                              <div style={{ display: "flex" }}>
                                <input
                                  style={{ width: "65%", marginRight: "2rem" }}
                                  type="text"
                                  className="form-control"
                                  placeholder={100}
                                  id="order-price"
                                  onChange={handleInputChange}
                                />
                                <button
                                  className="btn_1 medium pulse_bt"
                                  id="payment"
                                  onClick={makePayment}
                                >
                                  Continue to Payment Gateway
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="mt-3 mb-5" />
                        <h6>Notifications</h6>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group switch_wrapper">
                              <label>Set Reminders</label>
                              <p className="mb-0" style={{ color: "white" }}>
                                Notify me when my Snappcoins are depleted
                              </p>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  defaultChecked="checked"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /row */}
                        <div className="text-center form-group">
                          <div
                            id="error-message"
                            className="error-message"
                          ></div>
                          <div id="toast" className="center">
                            <div className="checkicon">
                              <i className="fas fa-check-square" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="pane-B"
                    className="card tab-pane fade"
                    role="tabpanel"
                  >
                    <div className="card-header" role="tab" id="heading-B">
                      <h5>
                        <a
                          className="collapsed"
                          data-bs-toggle="collapse"
                          href="#collapse-B"
                        >
                          Purchase History
                        </a>
                      </h5>
                    </div>
                    <div id="collapse-B" className="collapse" role="tabpanel">
                      <div className="row mt-lg-5 mt-3">
                        <aside className="col-lg-12">
                          <div className="widget search_blog">
                            <div className="form-group">
                              <div style={{ position: "relative" }}>
                                <input
                                  type="text"
                                  name="search"
                                  id="search"
                                  className="form-control"
                                  placeholder="Terms..."
                                />
                                <button
                                  style={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                  className="btn_1"
                                  id="search-btn"
                                  onClick={handleSearch}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                          <div
                            className="widget transaction-container"
                            style={{ height: "33rem", overflowY: "scroll" }}
                          >
                            <TransactionHistory searchKeyword={keyword} />
                          </div>
                        </aside>
                      </div>
                    </div>
                  </div>
                  <div
                    id="pane-C"
                    className="card tab-pane fade"
                    role="tabpanel"
                  >
                    <div className="card-header" role="tab" id="heading-C">
                      <h5>
                        <a
                          className="collapsed"
                          data-bs-toggle="collapse"
                          href="#collapse-C"
                        >
                          Game Registration
                        </a>
                      </h5>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "10vh" }}
                    >
                      <div>
                        <button className="btn_1 pulse_bt">
                          + Register a new Game
                        </button>
                      </div>
                    </div>
                    <div id="collapse-C" className="collapse" role="tabpanel">
                      <div className="row mt-lg-1 mt-3">
                        <div className="main_title version_2">
                          <span>
                            <em />
                          </span>
                          <h2>Registered Games</h2>
                        </div>
                      </div>
                      <ul className="list-group">
                        <li
                          className="list-group-item d-flex align-items-center"
                          style={{ backgroundColor: "transparent", color: "white" }}
                        >
                          <img
                            src="assets/img/tic-tac-toe.jpeg"
                            alt="Game 1"
                            className="me-3"
                            style={{ height: "100px", width: "100px" }}
                          />
                          <div className="text-start col-6 w-75">
                            <div className="my-1">
                              Game:{" "}
                              <Link to="#">{"Tic-Tac-Toe"}</Link>
                              <br />
                            </div>
                            <div className="my-1">
                              Game Id:{" "}
                              <Link to="#">{"#G-GV001-003"}</Link>
                              <br />
                            </div>
                            <div className="my-1">
                              Registration Date:{" "}
                              <Link to="#">{"09.05.23"}</Link>
                            </div>
                          </div>
                        </li>
                        <li
                          className="list-group-item d-flex align-items-center"
                          style={{ backgroundColor: "transparent", color: "white" }}
                        >
                          <img
                            src="assets/img/avatar2.jpg"
                            alt="Callbreak"
                            className="me-3"
                          />
                          <div className="text-start col-6 w-75">
                          <div className="my-1">
                              Game:{" "}
                              <Link to="#">{"Callbreak"}</Link>
                              <br />
                            </div>
                            <div className="my-1">
                              Game Id:{" "}
                              <Link to="#">{"#G-GV001-002"}</Link>
                              <br />
                            </div>
                            <div className="my-1">
                              Registration Date:{" "}
                              <Link to="#">{"16.03.23"}</Link>
                            </div>
                          </div>
                        </li>
                        <li
                          className="list-group-item d-flex align-items-center"
                          style={{ backgroundColor: "transparent", color: "white" }}
                        >
                          <img
                            src="assets/img/avatar3.jpg"
                            alt="Ludo King"
                            className="me-3"
                          />
                          <div className="text-start col-6 w-75">
                          <div className="my-1">
                              Game:{" "}
                              <Link to="#">{"Ludo King"}</Link>
                              <br />
                            </div>
                            <div className="my-1">
                              Game Id:{" "}
                              <Link to="#">{"#G-GV001-001"}</Link>
                              <br />
                            </div>
                            <div className="my-1">
                              Registration Date:{" "}
                              <Link to="#">{"21.09.22"}</Link>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /tab-content */}
              </div>
              {/* /tabs_detail */}
            </div>
          </div>
          {/* /row */}
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Dashboard;
