import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch-gamer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./utils/Loader";
import preLoader from './utils/PreLoader';
export default function CartItems(props) {

  //console.log("PIQ:",props.itemquantity)
  const token = localStorage.getItem("token");
  const [fetchData, { loading }] = useFetch();
  const gaming = useSelector((state) => state.gamerReducer);
  const profile = gaming.gamer;

  // console.log("CIprops: ", props);
  console.log(props)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");


  const [quantity, setQuantity] = useState(props.itemquantity);

  useEffect(() => {
    setQuantity(props.itemquantity);
  }, [props.itemquantity]);


  //console.log("QN : ", quantity);
  useEffect(() => {

    setImageSrc(
      props.itemImg
        ? `http://localhost:3004/${props.itemImg}`
        : "assets/img/default-prod.png"
    );
    setImageLoaded(false);
  }, [props.itemImg]);

  const handleDelete = useCallback(() => {
    let userid = profile._id;
    if (!userid) {
      return;
    }

    const config = {
      url: `http://localhost:3004/api/cart/deleteItemCart?uid=${userid}&itemId=${props.itemId}`,
      method: "post",
      headers: { Authorization: token },
    };

    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        //console.log("deleted");

        toast.success("Item Deleted Successfully");
        props.handleItemDeleted(props.itemId);
      })
      .catch((err) => {
        console.log(err);

      });
  }, [fetchData, token, profile._id, props.itemId]);

  const handlQuantity = useCallback((num) => {
    const userid = profile._id;
    if (!userid) {
      return;
    }
    const config = {
      url: `http://localhost:3004/api/cart/quantity?uid=${userid}&num=${num}&itemId=${props.itemId}`,
      method: "post",
      headers: { Authorization: token },
    };
    //console.log("PITEMID: ", props.itemId);

    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        //console.log("DFQ",data.finalQuantity)
        setQuantity(data.finalQuantity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, profile._id, props.itemId]);

  return (
    <div
      className="cartItem"
      style={{
        // width: "800px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Added to separate image and description
        borderRadius: "25px",
        marginBottom: "30px"
        //margin: "30px",
      }}
    >
      {!imageLoaded && (
        <div >
          <preLoader />
        </div>
      )}
      <a href="#0">

        <img
          src={`${imageSrc}`}
          alt=""
          data-src="img/items/item-4.jpg"
          className={`lazy ${imageLoaded ? "" : "hidden"}`}
          height="110px"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
          style={{ width: "150px", marginLeft: "1rem" }}
        />
      </a>
      <div className="description">
        {/* style={{ marginLeft: "-7rem" }} */}
        <p>
          <h6 style={{ fontSize: "14px" }}>{props.itemName}</h6>
        </p>
        <h6 style={{ marginTop: "-1rem", fontSize: "14px" }}>Price: {props.itemPrice} Snapps</h6>
      </div>
      <div className="countHandler">
        <button onClick={() => handlQuantity(-1)} className="btn btn-primary" style={{ marginRight: "10px" }}>-</button>
        <input
          style={{
            width: "30px",
            height: "30px",
            textAlign: "center",
            fontWeight: "bolder",
          }}
          value={quantity}
          readOnly
        />
        <button onClick={() => handlQuantity(+1)} style={{ marginLeft: "10px" }} className="btn btn-primary">+</button>
        <button
          className="btn btn-danger" // Add Bootstrap's danger class
          style={{ marginLeft: "5rem" }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
