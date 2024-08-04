import React, { useState, useEffect} from "react";

function MyItems(props) {
  //console.log("myitems props are:", props);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  console.log("props",props.game)
  useEffect(() => {
    // Assuming you receive the image URL from props
    setImageSrc(
      props.img
      ? `http://localhost:3004/api/merchant/img/${props.img}`
      : (props.game === "Tic-Tac-Toe"
          ? "assets/img/tic-tac-toe.jpeg"
          : (props.game === "junglee-rummy"
              ? "assets/img/avatar1.jpg"
              : props.game === "callbreak"? "assets/img/avatar2.jpg":"")
      )
    );
    setImageLoaded(false);
  }, [props.img,props.name]);

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
   
    <div
      classNameName="col-lg-4 col-md-6"
      
      data-show={true}
      style={{
        animationName: "slideInUp",
        animationDuration: "300ms",
        animationTimingFunction: "ease",
        animationDelay: "0ms",
        animationDirection: "normal",
        animationFillMode: "both",
      }}
      >
    <a href="#" class="history">
       
        <div class="history_thumb veryfied">
           
            <figure>
                <img
                  src={imageSrc}
                  alt=""
                  data-src="img/items/item-4.jpg"
                  className={`lazy ${imageLoaded ? "" : "hidden"}`}
                  height="90px"
                  width="100%"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(false)}
                />
            </figure>
        </div>
        <div>
            <h6>{props.game}</h6>
            <span class="badge" style={{"background-color": "#FF1493"}}>{props.money} Snapps</span>
            <div class="clearfix"></div>

            <small style={{color:"#48e0a4"}}><strong >Transaction ID :</strong> {props.tId}</small>
            <div class="clearfix"></div>
            <small style={{color:"#48e0a4"}}><strong>Date : </strong>{formatDate(props.tdate)}</small>
        </div>
    </a>
</div>
  );
}

export default MyItems;
