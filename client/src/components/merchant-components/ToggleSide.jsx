import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import HistoryCard from "./HistoryCard";
import useFetch from "../../hooks/useFetch-merchant";
import PageComp from "./PageComp";
import RedeemSnaps from "./RedeemSnaps";

const ToggleSide = (props) => {

    const token = localStorage.getItem('merchant-token');

    const [merchantVisibility, setMerchantVisibility] = useState(true)
    const [transactionVisibility, setTransactionVisibility] = useState(false)
    const [snapVisibility, setSnapVisibility] = useState(false)

    const [products, setProducts] = useState([]);
    const [total_count, setCount] = useState(0)
    const [total_transaction_count, setTransactionCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionCurrentPage, setTransactionCurrentPage] = useState(1);
    const itemsPerPage = 3; // change the value here sasi
    const [transactions, setTransactions] = useState([]);
    const [transactionId, setTransactionId] = useState('');

    const [fetchData, { loading }] = useFetch();
    
    const fetchMerchandises = useCallback(() => {
        const productConfig = {
            url: '/merchandise/getall',
            method: 'get',
            headers: { Authorization: token },
            params: { id: props.userId, pagenum: currentPage, size: itemsPerPage },
        };

        fetchData(productConfig, { showSuccessToast: false })
            .then((productData) => {
                setProducts(productData.merchandises);
                setCount(productData.count);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [fetchData, props.userId, token, currentPage]);

    const fetchTransactions= useCallback(()=>{
        const transactionConfig = {
            url: '/transactions/transactiondetails',
            method: 'get',
            headers: { Authorization: token },
            params: { id: props.userId, pagenum: transactionCurrentPage, size: itemsPerPage },
        };

        fetchData(transactionConfig, { showSuccessToast: false })
        .then((transactionData) => {
            setTransactions(transactionData.transactions);
            setTransactionCount(transactionData.count)
        })
        .catch((err) => {
            console.log(err);
        });

    },[fetchData, props.userId, transactionCurrentPage,token])

    useEffect(() => {
        fetchMerchandises();
    }, [fetchMerchandises,props.change]);
    
    useEffect(() =>{
        fetchTransactions();
    },[fetchTransactions])

    const handleMerchantToggle = (e) => {
        setMerchantVisibility(true)
        setTransactionVisibility(false)
        setSnapVisibility(false)
        setCurrentPage(1)
    }

    const handleTransactionToggle = (e) => {
        setTransactionVisibility(true)
        setMerchantVisibility(false)
        setSnapVisibility(false)
        setTransactionCurrentPage(1)
    }

    const handleRedeemToggle = (e) => {
        setSnapVisibility(true)
        setTransactionVisibility(false)
        setMerchantVisibility(false)
    }
    const handleDeleteMerchandise = (id, imgId) => {
        const deleteConfig = {
            url: '/merchandise/delete',
            method: 'delete',
            headers: { Authorization: token },
            params: { id, imgId },
        };
        fetchData(deleteConfig).then(() => {
            fetchMerchandises()
        })
            .catch((err) => console.log(err))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return date.toLocaleString('en-US', options);
    }

    //pagination logic
    const pagelength = Math.ceil(total_count / itemsPerPage)
    const transactionPageLength = Math.ceil(total_transaction_count / itemsPerPage)
    const start = 1;
    const end = pagelength;
    const transactionsend = transactionPageLength
    const pages = ["<<", "<"]; // represents  the starting page
    const transaction_pages = ["<<", "<"];

    console.log("total count : ", total_count)

    for (var i = start; i <= end; i++) {
        pages.push(i);
    }

    for (var j = start; j <= transactionsend; j++) {
        transaction_pages.push(j);
    }

    const handleClick = (e) => {
        e.preventDefault();
        var temppage = e.target.innerHTML
        if (temppage === "&lt;") {
            setCurrentPage((prev) => {
                if (prev > 1) {
                    return prev - 1
                }
                return prev
            })
        }
        else if (temppage === "&lt;&lt;") {
            setCurrentPage(1)
        }
        else if (temppage === "&gt;") {
            setCurrentPage((prev) => {
                if (prev < pagelength) {
                    return prev + 1
                }
                return prev
            })
        }
        else if (temppage === "&gt;&gt;") {
            setCurrentPage(pages[pages.length - 3])
        }
        else {
            setCurrentPage(temppage)
        }
        setProducts([])
    }
    
    const handleTransactionClick = (e) => {
        e.preventDefault();
        var temppage = e.target.innerHTML
        if (temppage === "&lt;") {
            setTransactionCurrentPage((prev) => {
                if (prev > 1) {
                    return prev - 1
                }
                return prev
            })
        }
        else if (temppage === "&lt;&lt;") {
            setTransactionCurrentPage(1)
        }
        else if (temppage === "&gt;") {
            setTransactionCurrentPage((prev) => {
                if (prev < pagelength) {
                    return prev + 1
                }
                return prev
            })
        }
        else if (temppage === "&gt;&gt;") {
            // setCurrentPage(pages[pages.length - 3])
            setTransactionCurrentPage(transaction_pages[transaction_pages.length - 3])
        }
        else {
            setTransactionCurrentPage(temppage)
        }
        // setProducts([])
        setTransactions([])
    }
    pages.push(">") // represents the ending page
    pages.push(">>")

    transaction_pages.push(">") // represents the ending page
    transaction_pages.push(">>")

    const handleSearch= () =>{
        const transactionConfig = {
            url: '/transactions/transactiondetails',
            method: 'get',
            headers: { Authorization: token },
            params: { id: props.userId,tid:transactionId , pagenum: transactionCurrentPage, size: itemsPerPage },
        };

       fetchData(transactionConfig, { showSuccessToast: false })
        .then((transactionData) => {
            setTransactions(transactionData.transactions);
            console.log(transactionData.count)
            setTransactionCount(transactionData.count);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (<div className="tabs_detail">
        <div className="text-center">
            <div className="card-header"> 
                <ul className="nav nav-tabs card-header-tabs ">
                    <li className="nav-item active">
                        <button className="nav-link  active" aria-current="true" id="merch" data-bs-toggle="tab" role="tab" onClick={handleMerchantToggle}>Merchandise</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" id="redeem" data-bs-toggle="tab" role="tab" onClick={handleRedeemToggle}>Redeem Snappcoins</button>
                    </li>
                    <li className="nav-item">
                        <button className= "nav-link" id="tranHis" data-bs-toggle="tab" role="tab" onClick={handleTransactionToggle}>Transaction History</button>
                        {/* here toggle active button to change the animation */}
                    </li>
                </ul>
            </div>
            {/* should have default another loader */}
            {loading ? <div className="justify-content-center mx-auto m-5 p-5"><div class="loader mx-auto m-5 p-5"></div></div>: <div className="card-body">
                {merchantVisibility && <div id="merchandise">
                    <div className="text-center my-4">
                        {/* <button className="btn_1 medium pulse_bt mb-3" data-bs-toggle="modal" data-bs-target="#product-upload">Add Merchandise</button> */}
                        <a href="/merchant-product-upload" className="btn_1"><i className="bi bi-cart-check-fill"></i> Add New Product</a>
                    </div>
                    {products && products.length > 0 ? (
                        <div className="row my-2">
                            {products.map((currentItems) => (
                                <ProductCard
                                    key={currentItems._id}
                                    img={currentItems.image}
                                    count={currentItems.count}
                                    title={currentItems.title}
                                    description={currentItems.description}
                                    brand={currentItems.brand}
                                    price={currentItems.price}
                                    category={currentItems.category}
                                    featured={currentItems.featured}
                                    merchandise={currentItems}
                                    onDeleteMerchandise={() => handleDeleteMerchandise(currentItems._id, currentItems.image)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No Merchandises available</p>
                    )}
                    <form action="">
                        <div className="pagination_fg mb-4">
                            {pages.map((i) => {
                                return <PageComp key={i} pagenum={i} handleClick={handleClick} isActive={currentPage === i ? true : false} />
                            })}
                        </div>
                    </form>
                </div>}
                {transactionVisibility &&
                    <div id="transactionHistory">
                        <div className="widget search_blog">
                            <div className="form-group mx-2 mt-4">
                                <input type="search" name="search" id="search" class="form-control" placeholder="Transaction Id ..." 
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                />
                                <span><input type="submit" value="Search" onClick={handleSearch}/></span>   
                                {/* <div className="input-group mb-3">
                                    <span className="input-group-text bg-dark text-secondary" style={{ border: "2px solid #36313D", borderColor: "#36313D", borderRight: "none", }} id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg></span>
                                    <input type="text" name="search" id="search" className="form-control" placeholder="Terms..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ borderLeft: "none" }}
                                        autoFocus autoComplete="off" />
                                </div> */}
                            </div>
                        </div>
                        {transactions && transactions.length > 0 ? <div>
                            {transactions
                                // .filter((transaction) => { return handleSearch(transaction) })
                                .map((transaction) => (
                                    <ul className="comments-list">
                                        <HistoryCard
                                            key={transaction._id}
                                            tid={transaction._id}
                                            gamer={transaction.gamerName}
                                            product={transaction.product}
                                            itemsPurchased={transaction.itemsPurchased}
                                            snaps={transaction.snaps}
                                            time={formatDate(transaction.time)}
                                            status={transaction.status}
                                            image={transaction.image}
                                            transactionEntry={transaction.transactionEntry}
                                        />
                                    </ul>
                                ))}
                        </div>
                        :
                        (
                            <p>No Transactions available</p>
                        )}
                            <form action="">
                                <div className="pagination_fg mb-4">
                                    {transaction_pages.map((i) => {
                                        return <PageComp key={i} pagenum={i} handleClick={handleTransactionClick} isActive={transactionCurrentPage === i ? true : false} />
                                    })}
                                </div>
                            </form>
                    </div>
                }
                {snapVisibility && <div className="redeem">
                    <RedeemSnaps />
                </div>}
            </div>}
        </div>

    </div>)
}


export default ToggleSide;