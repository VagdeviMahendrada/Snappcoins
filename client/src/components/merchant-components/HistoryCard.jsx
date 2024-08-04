import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./utils/Loader";

function HistoryCard(props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        setImageSrc(
          props.image
            ? `${process.env.REACT_APP_MERCHANT_MODULE_URL}/api/merchandise/img/${props.image}`
            : "assets/img/default-prod.png"
        );
      }, [props.image]);

    return (
        <div className="row py-3 px-3 mx-2 rounded form-group border">
            <div className="alignleft mt-4 my-3 mx-1 d-flex justify-content-center col-1">
                <Link to="#0">
                    <figure>
                        {!imageLoaded && <div><Loader /></div>}
                        <img
                        src={imageSrc}
                        // data-src="img/items/item-4.jpg"
                        className={`lazy ${imageLoaded ? "" : "hidden"}`}
                        alt=""
                        height="50px"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)}
                        />
                    </figure>
                </Link>
            </div>
            <div className="text-start col-6 w-75">
                <small>{props.time}</small>
                <h3 className="my-1"><Link to="#" title="">Transaction id # {props.tid}</Link></h3>
                <h3 className="my-2"><Link to="#">Date of transaction: {props.time}</Link></h3>
                {props.transactionEntry === 'credit' ?<>
                    <h3 className="my-2"><Link to="#">Transaction Details: Gamer {props.gamer} purchased  {props.itemsPurchased + " " + props.product} merchandise{props.itemsPurchased>1?"s":" "}</Link></h3>
                    <h3 className="my-2"><Link to="#">Amount: {props.snaps * props.itemsPurchased} snapps</Link></h3>
                    <span className="badge bg-success text-light mx-1">Credit</span>
                </>:
                <>   
                    <h3 className="my-2"><Link to="#">Redeemed {props.snaps} Snapps</Link></h3>
                    <span className="badge bg-danger text-light mx-1">Debit</span>
                </>}
                {props.status === "success" && <span className="badge bg-success text-light mx-1">Success</span>}
                {props.status === "pending" && <span className="badge bg-warning text-light mx-1">In Processing</span>}
                {props.status === "failure" && <span className="badge bg-danger text-light  mx-1">Failed</span>}
            </div>
        </div>
    )
}



export default HistoryCard;