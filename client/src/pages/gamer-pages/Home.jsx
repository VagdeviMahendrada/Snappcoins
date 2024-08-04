import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gamerProfile } from "../../redux/actions/gamerAction";

import Footer from "../../components/general-components/Footer";
import Header from "../../components/gamer-components/Navbar";
import Card from "../../components/gamer-components/Card";
import TransactionHistory from "../../components/gamer-components/TransactionHistory";
import Recommended from "../../components/gamer-components/Recommended";
import PageComp from "../../components/gamer-components/PageComp";
import MyItems from "../../components/gamer-components/myItems";
import CartItems from "../../components/gamer-components/CartItems";
import Hero from "../../components/gaming-vendor-components/Hero"

import useFetch from "../../hooks/useFetch-gamer";


export default function Home() {
  const [user, setUser] = useState();
  const [merchant, setMerchant] = useState([]);
  const [snaphistory, setSnaphistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [Redeemed, setRedeemed] = useState(0);

  console.log("CI: ", cartItems);
  //console.log("SH: ",snaphistory)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();

  const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    const config = {
      url: "/profile",
      method: "get",
      headers: { Authorization: token },
    };
    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setUser(data.user);
        console.log("d is: ", data);
        dispatch(gamerProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, dispatch]);

  useEffect(() => {
    if (!token) {
      // Redirect to login page if token is null
      navigate('/', { state: { message: "You are not logged in." } })

    } else {
      fetchUser();
    }



  }, [fetchUser]);

  //RECOMMENDATION SECTION
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMerchandises, setTotalMerchandises] = useState(null);
  const itemsPerPage = 3; // change the value here sasi
  const [location, setLocation] = useState(null)


  const fetchMerchandise = useCallback(async () => {
    const config = {
      url: `/merchant/display/?country=${user.country}`,
      method: "get",
      headers: { Authorization: token },
      params: { pagenum: currentPage, size: itemsPerPage, },
    };
    console.log("current page "+currentPage ,"items per page "+itemsPerPage);

    try {
      const response = await fetchData(config, { showSuccessToast: false });
      setMerchant(response.merchant);
      return response; // Return the response object for further processing
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  }, [fetchData, token, currentPage, itemsPerPage, user]);
  useEffect(() => {
    const fetchMerchandiseData = async () => {
      try {
        const response = await fetchMerchandise();
        setTotalMerchandises(response.total_count);
        setMerchant(response.merchant);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMerchandiseData()





  }, [fetchMerchandise]);
  console.log(location)
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        //const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
        //document.getElementById("location").textContent = location;
        const API_KEY = "f4bcb003dd8748e38b42e9da8d97a678";
        // let config = {
        //   url:`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`,
        //   //method: "get",
        // };
        await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`, { method: "get" })
          .then((response) => response.json())
          .then((data) => {
            setLocation(data.results[0].components.country)
            //fetchMerchandise(data.results[0].components.country)
          }
          )

        //setLocation(response.data)

      });


    }

  }
  useEffect(() => {



    //getLocation()


    // async function getLocationDetails() {
    //      if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition( async function(position) {
    //       const latitude = position.coords.latitude;
    //       const longitude = position.coords.longitude
    //       try {
    //         const response = await fetch(`http://localhost:3004/api/profile/reverse-geocode?latitude=${latitude}&longitude=${longitude}`);
    //         const data = await response.json();
    //         setLocation(data)
    //         console.log(location)
    //         // document.getElementById("location").textContent = `Location: ${data.location}`;
    //         // document.getElementById("country").textContent = `Country: ${data.country}`;
    //       } catch (error) {
    //         console.error(error);
    //         //document.getElementById("location").textContent = 'An error occurred while fetching data';
    //       }
    //     })
    //     //   const latitude = position.coords.latitude;
    //     //   const longitude = position.coords.longitude;
    //     //   //const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
    //     //   //document.getElementById("location").textContent = location;
    //     //   const API_KEY = "f4bcb003dd8748e38b42e9da8d97a678";
    //     //   // let config = {
    //     //   //   url:`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`,
    //     //   //   //method: "get",
    //     //   // };
    //     //  await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`,{method:"get"}).then((response)=>response.json()).then((data)=>setLocation(data.results[0].components.country))


    //     //  //setLocation(response.data)

    //     // });
    //      }
    //     }

    //  getLocationDetails()

  }, [])

  //  console.log("location",location)

  //pagination implemented for Recommendatons section

  const pagelength = Math.ceil(totalMerchandises / itemsPerPage);
  console.log("TM: ", totalMerchandises);
  console.log("PL: ", pagelength);
  const start = 1;
  const end = pagelength;
  const pages = ["<<", "<"]; // represents  the starting page

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  pages.push(">"); // represents the ending page
  pages.push(">>");

  const handleClick = (e) => {
    e.preventDefault();
    var temppage = e.target.innerHTML;
    if (temppage === "&lt;") {
      setCurrentPage((prev) => {
        prev = parseInt(prev);
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (temppage === "&lt;&lt;") {
      setCurrentPage(1);
    } else if (temppage === "&gt;") {
      setCurrentPage((prev) => {
        prev = parseInt(prev);
        if (prev < end) {
          return prev + 1;
        }
        return prev;
      });
    } else if (temppage === "&gt;&gt;") {
      setCurrentPage(pages[pages.length - 3]);
    } else {
      setCurrentPage(temppage);
    }
  };

  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalHistory, setTotalHistory] = useState();
  const itemsPerPage2 = 6;

  //console.log("user id: ",user?._id);

  //----------------------------------------------------------------------------------------------------------------------------//

  //snapps Redeemed

  const fetchhistory = useCallback(() => {
    const userId = user?._id;
    if (!userId) {
      return; // Return early if user ID is not available
    }

    const config = {
      url: `http://localhost:3004/api/snapps/snappscollected?uid=${userId}`,
      method: "get",
      headers: { Authorization: token },
      params: { pagenum: currentPage2, size: itemsPerPage2 },
    };

    return fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setTotalHistory(data.total_counts);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, user, currentPage2, itemsPerPage2]);


  useEffect(() => {
    const fetchTransDatas = async () => {
      try {
        const response = await fetchhistory();
        if (response) {

          setSnaphistory(response.games);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransDatas();
  }, [fetchhistory]);

  const pagelength2 = Math.ceil(totalHistory / itemsPerPage2);
  console.log("TH: ", totalHistory);
  console.log("PL2: ", pagelength2);
  const start2 = 1;
  const end2 = pagelength2;
  const pages2 = ["<<", "<"]; // represents  the starting page

  for (let i = start2; i <= end2; i++) {
    pages2.push(i);
  }

  pages2.push(">"); // represents the ending page
  pages2.push(">>");

  console.log(pages2);

  const handleClick2 = (e) => {
    e.preventDefault();
    var temppage = e.target.innerHTML;
    if (temppage === "&lt;") {
      setCurrentPage2((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (temppage === "&lt;&lt;") {
      setCurrentPage2(1);
    } else if (temppage === "&gt;") {
      setCurrentPage2((prev) => {
        if (prev < end2) {
          return prev + 1;
        }
        return prev;
      });
    } else if (temppage === "&gt;&gt;") {
      setCurrentPage2(end2);
    } else {
      setCurrentPage2(parseInt(temppage));
    }
  };


  const [searchsnapKeyword, setsnapSearchKeyword] = useState("");

  console.log(searchsnapKeyword)

  const handlesnapSearch = () => {

    const userId = user?._id;

    const snapConfig = {
      url: `http://localhost:3004/api/snapps/snappscollected?uid=${userId}`,
      method: "get",
      headers: { Authorization: token },
      params: {

        tID: searchsnapKeyword,
      },
    };

    fetchData(snapConfig, { showSuccessToast: false })
      .then((transactionData) => {
        if (transactionData.games.length === 0) {
          // No transactions found for the searched keyword
          setSnaphistory([]);
          setTotalHistory(0);
        } else {
          setSnaphistory(transactionData.games);
          setTotalHistory(transactionData.total_counts);
        }
        console.log(transactionData)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  //----------------------------------------------------------------------------------------------------------------------//

  //snapps collected

  const [currentPage1, setCurrentPage1] = useState(1);
  const [totaltransactions, setTotaltransactions] = useState();
  const itemsPerPage1 = 3; // change the value here sasi

  //const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  console.log(searchKeyword);

  //const [isSearchClicked, setIsSearchClicked] = useState(false);

  const fetchTransactions = useCallback(() => {
    const config = {
      url: `/transaction/displayItems?user_id=${user?._id}`,
      method: "get",
      headers: { Authorization: token },
      params: { pagenum: currentPage1, size: itemsPerPage1 }, // Use currentPage1 here instead of currentPage
    };

    return fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setTotaltransactions(data.total_counts);
        // setTottransactions(data.total_trans)
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, user, currentPage1, itemsPerPage1]);

  useEffect(() => {
    const fetchTransData = async () => {
      try {
        const response = await fetchTransactions();
        if (response) {
          setTransactions(response.transactions);
          setPendingOrders(response.pendingOrders);
          setRedeemed(response.redeemed);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransData();
  }, [fetchTransactions]);

  //pagination implemented for transaction history
  const pagelength1 = Math.ceil(totaltransactions / itemsPerPage1);
  console.log("TT: ", totaltransactions);
  console.log("PL1: ", pagelength1);
  const start1 = 1;
  const end1 = pagelength1;
  const pages1 = ["<<", "<"]; // represents  the starting page

  for (let i = start1; i <= end1; i++) {
    pages1.push(i);
  }

  pages1.push(">"); // represents the ending page
  pages1.push(">>");

  console.log(pages1);

  const handleClick1 = (e) => {
    e.preventDefault();
    const temppage = e.target.innerHTML;

    if (temppage === "&lt;" || temppage === "<") {
      setCurrentPage1((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (temppage === "&lt;&lt;" || temppage === "<<") {
      setCurrentPage1(1);
    } else if (temppage === "&gt;" || temppage === ">") {
      setCurrentPage1((prev) => {
        if (prev < end1) {
          return prev + 1;
        }
        return prev;
      });
    } else if (temppage === "&gt;&gt;" || temppage === ">>") {
      setCurrentPage1(end1);
    } else {
      // Check if it's a search page
      if (searchKeyword !== "") {
        // Calculate the page number based on the index of the clicked page
        const clickedPage = parseInt(temppage);
        const searchPage = Math.ceil(
          (clickedPage * itemsPerPage1) / itemsPerPage
        );
        setCurrentPage1(searchPage);
      } else {
        setCurrentPage1(parseInt(temppage));
      }
    }

    // Perform the search if a keyword is present
    if (searchKeyword !== "") {
      handleSearch();
    } else {
      fetchTransactions();
    }
  };

  // Update handleSearch to include the logic for regular page clicks
  const handleSearch = () => {
    const transactionConfig = {
      url: `/transaction/displayItems?user_id=${user?._id}`,
      method: "get",
      headers: { Authorization: token },
      params: {
        pagenum: currentPage1,
        size: itemsPerPage1,
        searchTerm: searchKeyword,
      },
    };

    fetchData(transactionConfig, { showSuccessToast: false })
      .then((transactionData) => {
        if (transactionData.transactions.length === 0) {
          // No transactions found for the searched keyword
          setTransactions([]);
          setTotaltransactions(0);
        } else {
          setTransactions(transactionData.transactions);
          setTotaltransactions(transactionData.total_counts);
        }
        console.log(transactionData)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //-----------------------------------------------------------------------------------------------//

  const [currentPage3, setCurrentPage3] = useState(1);
  const [totalitems, setTotalitems] = useState();
  const itemsPerPage3 = 3; // change the value here sasi

  const fetchCart = useCallback(() => {

    const userId = user?._id;
    if (!userId) {
      return; // Return early if user ID is not available
    }

    const config = {
      url: `http://localhost:3004/api/cart/showItems?uid=${userId}`,
      method: "get",
      headers: { Authorization: token },
      params: { pagenum: currentPage3, size: itemsPerPage3 },
    };

    return fetchData(config, { showSuccessToast: false })
      .then((data) => {
        console.log("my data", data)
        console.log("home", data.items)


        setCartItems(data.items);


        setTotalitems(data.length);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, user, currentPage3, itemsPerPage3]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetchCart();
        console.log(response)
        if (response) {
          setCartItems(response.items);
          setTotalitems(response.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartData();
  }, [fetchCart]);

  const handleItemDeleted = (itemId) => {
    // Remove the deleted item from the cartItems state
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== itemId)
    );
  };



  const pagelength3 = Math.ceil(totalitems / itemsPerPage3);
  console.log("TI: ", totalitems);
  console.log("PL3: ", pagelength3);
  const start3 = 1;
  const end3 = pagelength3;
  const pages3 = ["<<", "<"]; // represents  the starting page

  for (let i = start3; i <= end3; i++) {
    pages3.push(i);
  }

  pages3.push(">"); // represents the ending page
  pages3.push(">>");

  console.log(pages3);

  const handleClick3 = (e) => {
    e.preventDefault();
    const temppage = e.target.innerHTML;
    
    if (temppage === "&lt;" || temppage === "<") {
      setCurrentPage3((prev) => {
        prev = parseInt(prev);
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (temppage === "&lt;&lt;" || temppage === "<<") {
      setCurrentPage3(1);
    } else if (temppage === "&gt;" || temppage === ">") {
      setCurrentPage3((prev) => {
        if (prev < end3) {
          return prev + 1;
        }
        return prev;
      });
    } else if (temppage === "&gt;&gt;" || temppage === ">>") {
      setCurrentPage3(end3);
    }
  };


  return (
    <>

      <Header />

      {/* <div className="banner">
        <img
          src="assets/img/hero_general.jpg"
          alt=""
          className="card-img-top w-100"
          style={{
            height: "60rem",
            marginTop: "0px",
            marginBottom: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
        />
      </div> */}
      <Hero />

      <div class="container margin_30_40">
        <div class="row justify-content-center">
          <div class="col-lg-3 col-md-6">
            {user && (
              <Card
                gamerName={user.userName}
                id={user._id}
                walletMoney={user.walletMoney}
                memberSince={user.joiningTime}
                pending={pendingOrders}
                redeemed={Redeemed}
              />
            )}
          </div>
          <div class="col-lg-9 ps-lg-5">
            <div class="tabs_detail">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a
                    id="tab-A"
                    href="#pane-A"
                    class="nav-link active"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    Recommended
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    id="tab-B"
                    href="#pane-B"
                    class="nav-link"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    Snapps Collected
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    id="tab-D"
                    href="#pane-D"
                    class="nav-link"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    My Cart
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    id="tab-C"
                    href="#pane-C"
                    class="nav-link"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    Snapps Redeemed
                  </a>
                </li>


              </ul>
              <div class="tab-content" role="tablist">
                <div
                  id="pane-A"
                  class="card tab-pane fade show active"
                  role="tabpanel"
                >
                  <div class="card-header" role="tab" id="heading-A">
                    <h5>
                      <a
                        class="collapsed"
                        data-bs-toggle="collapse"
                        href="#collapse-A"
                      >
                        Recommended 
                      </a>
                    </h5>
                  </div>
                  <div id="collapse-A" className="collapse" role="tabpanel">
                    <div className="row mt-lg-5 mt-3">
                      { merchant.length == 0 && <center>
                        <h3>No Merchandise Avaiable right now!</h3>
                      </center> }
                      {merchant.map((product, index) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6 col-sm-6"
                          key={index}
                        >
                          <div style={{ width: "100%" }}>
                            <Recommended
                              title={product.title}
                              pid={product._id}
                              img={product.image}
                              desc={product.description}
                              brand={product.brand}
                              price={product.price}
                              userid={product.userid}
                              index={index}
                              featured={product.featured}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <div className="pagination_fg mb-4">
                        {pages.map((i) => {
                          return (
                            <PageComp
                              key={i}
                              pagenum={i}
                              handleClick={handleClick}
                              isActive={currentPage == i}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div id="pane-B" class="card tab-pane fade" role="tabpanel">
                  <div class="card-header" role="tab" id="heading-B">
                    <h5>
                      <a
                        class="collapsed"
                        data-bs-toggle="collapse"
                        href="#collapse-B"
                      >
                        Transaction History
                      </a>
                    </h5>
                  </div>
                  <div id="collapse-B" class="collapse" role="tabpanel">
                    <div class="row mt-lg-5 mt-3">
                      <aside class="col-lg-12">
                        {
                          snaphistory.length > 0 &&
                          <div class="widget search_blog">
                            <div class="form-group d-flex">
                              <input
                                class="form-control me-2 w-100 bg-white text-dark"
                                type="search"
                                placeholder="Search here..."
                                aria-label="Search"
                                value={searchsnapKeyword}
                                onChange={(e) => setsnapSearchKeyword(e.target.value)}
                              />
                              <button
                                class="btn text-white bg-danger inside"
                                onClick={handlesnapSearch}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        }
                        <div class="widget">
                          {snaphistory.length > 0 ? (
                            <div className="row history_list">
                              {snaphistory.map((transaction, index) => {

                                return (
                                  <div
                                    className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                                    key={index}
                                  >
                                    <MyItems money={transaction.moneyWon}
                                      game={transaction.name}
                                      tId={transaction.tid}
                                      tdate={transaction.date}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <center>
                              <h3>No Snapps Collected</h3>
                            </center>
                          )}

                        </div>

                        {snaphistory.length > 0 &&
                          <div className="text-center">
                            <div className="pagination_fg mb-4">
                              {pages2.map((i) => {
                                return (
                                  <PageComp
                                    key={i}
                                    pagenum={i}
                                    handleClick={handleClick2}
                                    isActive={currentPage2 === i ? true : false}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        }
                      </aside>
                    </div>
                  </div>
                </div>

                <div id="pane-C" class="card tab-pane fade" role="tabpanel">
                  <div class="card-header" role="tab" id="heading-C">
                    <h5>
                      <a
                        class="collapsed"
                        data-bs-toggle="collapse"
                        href="#collapse-C"
                      >
                        Transaction History
                      </a>
                    </h5>
                  </div>
                  <div id="collapse-C" class="collapse" role="tabpanel">
                    <div class="row mt-lg-5 mt-3">
                      <aside class="col-lg-12">
                        {transactions.length > 0 &&
                          <div class="widget search_blog">
                            <div class="form-group d-flex">
                              <input
                                class="form-control me-2 w-100 bg-white text-dark"
                                type="search"
                                placeholder="Search here..."
                                aria-label="Search"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                              />
                              <button
                                class="btn text-white bg-danger inside"
                                onClick={handleSearch}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        }
                        <div class="widget">
                          {transactions.length > 0 ? (
                            <div>
                              {transactions.map((transaction, index) => (
                                <TransactionHistory
                                  key={index}
                                  tdate={transaction.transactionDate}
                                  tId={transaction.transactionId}
                                  status={transaction.orderStatus}
                                />
                              ))}
                            </div>
                          ) : (
                            <center>
                              <h3>No Snapps Redeemed</h3>
                            </center>
                          )}
                        </div>
                        {transactions.length > 0 &&
                          <div class="text-center">
                            <div class="pagination_fg mb-4">
                              {pages1.map((i) => {
                                return (
                                  <PageComp
                                    key={i}
                                    pagenum={i}
                                    handleClick={handleClick1}
                                    isActive={currentPage1 == i ? true : false}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        }
                      </aside>
                    </div>
                  </div>

                </div>

                <div id="pane-D" class="card tab-pane fade" role="tabpanel">
                  <div class="card-header" role="tab" id="heading-D">
                    <h5>
                      <a class="collapsed" data-bs-toggle="collapse" href="#collapse-D">
                        My Cart
                      </a>
                    </h5>
                  </div>
                  <div id="collapse-D" class="collapse" role="tabpanel">
                    <div class="row mt-lg-5 mt-3">
                      <aside class="col-lg-12">
                        { cartItems.length > 0 && 
                          <div class="widget search_blog">
                          <div class="form-group d-flex">
                            <input
                              class="form-control me-2 w-100 bg-white text-dark"
                              type="search"
                              placeholder="Search here..."
                              aria-label="Search"
                              value={searchKeyword}
                              onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <button
                              class="btn text-white bg-danger inside"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        }
                        <div class="widget">
                          {cartItems.length > 0 ? (
                            <div>

                              {cartItems.map((item, index) => (
                                <CartItems

                                  key={index}
                                  itemName={item.name}
                                  itemPrice={item.price}
                                  itemImg={item.img}
                                  itemId={item._id}
                                  itemquantity={item.quantity}
                                  handleItemDeleted={handleItemDeleted}
                                />
                              ))}
                            </div>
                          ) : (
                            <center>
                              <h3>No Items Found</h3>
                            </center>
                          )}
                        </div>
                        {
                          cartItems.length > 0 &&
                          <div class="text-center">
                            <div class="pagination_fg mb-4">
                              {pages3.map((i) => {
                                return (
                                  <PageComp
                                    key={i}
                                    pagenum={i}
                                    handleClick={handleClick3}
                                    isActive={currentPage3 === i ? true : false}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        }
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
