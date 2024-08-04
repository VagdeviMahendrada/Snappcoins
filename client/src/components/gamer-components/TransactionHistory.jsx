import React, { useState, useEffect, useCallback } from "react";

export default function TransactionHistory(props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Assuming you receive the image URL from props
    setImageSrc(
      props.img
        ? `${process.env.REACT_APP_GAMER_API}/api/merchant/img/${props.img}`
        : "assets/img/default-prod.png"
    );
    setImageLoaded(false);
  }, [props.img]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <ul className="comments-list">
      <li>
        <div className="alignleft">
          <a href="#0">
            <img
              src={imageSrc}
              alt=""
              data-src="img/items/item-4.jpg"
              className={`lazy ${imageLoaded ? "" : "hidden"}`}
              height="50px"
              width="100%"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          </a>
        </div>
        <small>{formatDate(props.tdate)}</small>
        <h3>
          <a href="#" >
            {props.tId}
          </a>
        </h3>
        <div style={{ marginTop: "2px" }}>
          {props.status === "Delivered" && (
            <span>
              <span className="badge bg-success text-light">
                Delivered
              </span>
              <span>
                <a href="#">{" "}
                  | Raise An Issue
                </a>
              </span>
            </span>
          )}
          {props.status === "In transit" && (
            <span>
              <span className="badge bg-warning text-light">
                In Transit
              </span>
              <span>
                <a href="#">{" "}
                  | Cancel
                </a>
              </span>
            </span>
          )}
          {props.status === "Cancelled" && (
            <span className="badge bg-danger text-light">Cancelled</span>
          )}
        </div>
      </li>
    </ul>
  );
}
