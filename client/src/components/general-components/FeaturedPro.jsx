import React from "react";
import { Link } from "react-router-dom";

const FeaturedPro = (props) => {
    return (
        <div className='owl-item mx-3' style={{
            width: "295.333px" 
        }}> 
            <div className="item">
                <div className="strip">
                    <figure>
                        <img
                            src="assets/img/items/item-1.jpg"
                            className="owl-lazy"
                            alt=""
                            width="533"
                            height="400"
                        />
                        <Link to="detail-page.html" className="strip_info">
                            <div className="item_title">
                                <span className="badge bg-primary">3.25 Snapps</span>
                            </div>
                        </Link>
                    </figure>
                    <ul>
                        <li>
                            <Link to="author.html" className="author">
                                <div className="author_thumb veryfied">
                                    <i className="bi bi-check"></i>
                                    <figure>
                                        <img
                                            src="assets/img/avatar2.jpg"
                                            alt=""
                                            className="owl-lazy"
                                            width="100"
                                            height="100"
                                        />
                                    </figure>
                                </div>
                                <h6>JBL Noise Cancellation Pods</h6>
                            </Link>
                        </li>
                        <li>
                            <Link to="#0" className="wish_bt">
                                <i className="bi bi-heart-fill"></i>
                            </Link>{" "}
                            50
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default FeaturedPro;