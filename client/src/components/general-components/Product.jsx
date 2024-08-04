import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Loader from "./Loader";
import axios from "axios"
import ImgLoader from "./ImgLoader";
import SnappnowLink from "./SnappnowLink";
import { Fade } from "react-awesome-reveal";

function Product(props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [ProfPicLoaded, setProfPicLoaded] = useState(false)
    const [ProfilePic, setProfilePic] = useState("");


    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3002/api/getprofile${props.userid}`)
                const imgsrc = response.data.user.image
                console.log(imgsrc)
                setProfilePic(
                    (imgsrc)
                        ? `http://127.0.0.1:3002/api/img${imgsrc}`
                        : "assets/img/items/default-prof.png"
                );
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
        setImageSrc(
            props.img
                ? `http://127.0.0.1:3002/api/merchandise/img${props.img}`
                : "assets/img/items/default-prod.png"
        );
    }, [props.img, props.profpic, ProfilePic]);

    return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
            <Fade>
            <div className="strip">
            {props.datatopass.featured && <div className="ribbon mt-2 me-2">
                        <span>Featured</span>
                    </div>}
                <figure >
                    {!imageLoaded && <div > <Loader /> </div>}<SnappnowLink imageLoaded={imageLoaded} url="\detail-page" datatopass={props.datatopass} />
                    <img src={imageSrc} data-src="img/items/item-12.jpg" className={`lazy ${imageLoaded ? "" : "visually-hidden"}`} alt="" width="533" height="400" onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)} />
                    <Link  className="strip_info">
                        <div className="item_title">
                            <span className="badge bg-violet">{props.price} Snapps</span>
                        </div>
                    </Link>
                </figure >
                <ul>
                    <li>
                        <Link  className="author">
                            <div className="author_thumb veryfied"><i className="bi bi-check"></i>
                                <figure>{!ProfPicLoaded && <div > <ImgLoader /> </div>}
                                    <img src={ProfilePic} data-src="img/avatar2.jpg" alt="" className={`lazy ${ProfPicLoaded ? "" : "visually-hidden"}`} width="100px" onLoad={() => setProfPicLoaded(true)} onError={() => setProfPicLoaded(false)} /></figure>
                            </div>
                            <h6 className="text-wrap" style={{
                                
                            }} title={props.title} >{props.title.slice(0,25) + `${props.title.length > 25 ? "..." : ""}`  }</h6>
                        </Link>
                    </li>
                    <li></li>
                    <li>
                        <Link  className="wish_bt"></Link><i className="bi bi-stack"></i> {props.count}
                    </li>
                </ul>
                <ul>
                    <li className="container-fluid"  >{ props.genre.length > 0 ?  props.genre.map((g) => {
                        return <span className="badge bg-success me-1" >{g}</span>
                    }) : <span className="badge bg-danger me-1" >No Category</span>}</li>
                </ul>
                <ul>
                    <li className="" title={props.desc} >{props.desc.slice(0, 20) + "..."}</li>
                    <li className="text-uppercase link">{props.brand}</li>
                </ul>
            </div>
            </Fade>
        </div>
    )
}


export default Product;