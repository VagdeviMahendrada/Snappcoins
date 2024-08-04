import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TransactionHistory(props) {
  const [vendorId, setVendorId] = useState("");
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/gaming-vendor-auth/verify-user`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setVendorId(data.vendor_id);
        } else {
          window.location.href = "/gaming-vendor-login";
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        console.log(vendorId)
        const response = await fetch(
          `http://localhost:3001/gaming-vendor-transactions/history/${vendorId}`
        );
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          // const sortedTransactions = data.transactions.sort((a, b) => {
          //   const dateA = new Date(a.transaction_date);
          //   const dateB = new Date(b.transaction_date);
          //   return dateB - dateA;
          // });
          console.log(data.transactions)
          setTransactions(data.transactions);
        } else {
          console.log("Failed to retrieve transaction history");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (vendorId && props.searchKeyword === "") {
      fetchTransactionHistory();
    }
  }, [vendorId, props.searchKeyword]);

  useEffect(() => {
    const searchTransactions = async (vendorId, keyword) => {
      try {
        const response = await fetch(
          `http://localhost/3001/gaming-vendor-transactions/search-transactions/${vendorId}/${keyword}`
        );
        setTransactions(response.data.transactions);
    
      } catch (error) {
        console.log(error);
      }
    };

    if (vendorId && props.searchKeyword !== "") {
      searchTransactions(vendorId, props.searchKeyword);
    }
  }, [vendorId, props.searchKeyword]);

  console.log(transactions)
  return (
    <ul id="transaction-list" style={{ listStyleType: "none", paddingRight: "30px" }}>
      {transactions && transactions.map((transaction) => {
        const transactionDate = new Date(transaction.transaction_date)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, ".");

        return (
          <div key={transaction.transaction_id} className="row py-3 px-3 mx-2 rounded form-group border">
            <div className="alignleft mt-4 my-3 mx-1 d-flex justify-content-center col-1">
              <Link to="#0">
                <figure>
                  <img
                    src="assets/img/apple-touch-icon-57x57-precomposed.png"
                    className={`lazy`}
                    alt=""
                    height="50px"
                  />
                </figure>
              </Link>
            </div>
            <div className="text-start col-6 w-75" style={{ marginTop: "20px", color: "white" }}>
              <div className="my-1">
                Transaction id:{" "}
                <Link to="#" title="">
                  {"#" + transaction.transaction_id}
                </Link>
                <br />
              </div>
              <div className="my-1">
                Date of transaction: <Link to="#"> {transactionDate}</Link>
                <br />
              </div>
              <div className="my-1">
                Amount: <Link to="#"> {transaction.snappcoin_count} Snapps</Link>
                <br />
              </div>
              <div className="my-1">
                Status:{" "}
                <span
                  className={`badge ${
                    transaction.transaction_status === "success"
                      ? "bg-success"
                      : transaction.transaction_status === "pending"
                      ? "bg-warning"
                      : "bg-danger"
                  } text-light`}
                >
                  {transaction.transaction_status}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
}

export default TransactionHistory;
