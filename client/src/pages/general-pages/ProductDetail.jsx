import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/general-components/Loader";
import Header from "../../components/general-components/Header";
import Footer from "../../components/general-components/Footer";
import { Fade } from "react-awesome-reveal"

const ProductDetail = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [ProfPicLoaded, setProfPicLoaded] = useState(false)
    const [ProfilePic, setProfilePic] = useState("");
    const [user_name , setuser] = useState("")
    const { state } = useLocation();
    const [ ClickedSnappNow , setClicked ] = useState(false);
    console.log("hitted")
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetch = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3002/api/getprofile${state.datatopass.userid}`)
                const imgsrc = response.data.user.image
                setuser(response.data.user.companyName)
                console.log("image src for prod", imgsrc)
                console.log(state)
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
            state.datatopass.image
                ? `http://127.0.0.1:3002/api/merchandise/img${state.datatopass.image}`
                : "assets/img/items/default-prod.png"
        );
        console.log("the src for prod img : ", state.datatopass.image)
    }, [state.datatopass.img, state.datatopass.profpic, ProfilePic]);
    return (
        <div>
            <Header /><br /><br /><br />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7 margin_detail">

                                <div className="box_general">
                                    {!imageLoaded && <div className="d-flex justify-content-center align-items-center m-5 p-5"><Loader /></div>}
                                    <img src={imageSrc} width={"100%"} alt="" className={`img-fluid ${imageLoaded ? `` : `visually-hidden`}`} onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(false)} />
                                    <div className="main_info_wrapper">
                                        <div className="main_info">
                                            <div className="clearfix mb-3">
                                                <div className="item_desc">
                                                    <div className="mb-3">
                                                        <a className="author">
                                                            <div className="author_thumb veryfied"><i className="bi bi-check"></i>
                                                                <figure>
                                                                    {!ProfPicLoaded && <div style={{
                                                                        transform: "scale(0.4)"
                                                                    }}>
                                                                        <Loader /></div>}
                                                                    <img src={`${ProfilePic}`} data-src="img/avatar1.jpg" alt="" className={`lazy${ProfPicLoaded ? `` : `visually-hidden`}`} width="100" height="100" data-was-processed="true" onLoad={() => setProfPicLoaded(true)} /></figure>
                                                            </div>
                                                            <h6 className="ms-1">{state.datatopass.brand}</h6>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="score_in">
                                                    <i className="bi bi-stack me-1"></i> 123<a className="wish_bt"></a>
                                                </div>
                                            </div>
                                            <h1 className="mb-md-2">{state.datatopass.title}</h1>
                                            <p>{state.datatopass.description}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="tabs_detail">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a id="tab-C" href="#pane-C" className="nav-link active" data-bs-toggle="tab" role="tab">Additional Info</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" role="tablist">
                                        <div id="pane-A" className="card tab-pane fade show active" role="tabpanel" aria-labelledby="tab-A">
                                            <div id="collapse-A" className="collapse" role="tabpanel" aria-labelledby="heading-A">
                                                <div className="pt-4">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            {/* <ul className="bullets text-white">
                                                            <li>Size <span>3000x2000px</span></li>
                                                            <li>Format <span>Tiff, Jpeg, Gif, Pdf</span></li>
                                                            <li>Token ID <span>002334</span></li>

                                                        </ul> */}
                                                            <p className="text-white">Not available</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-5" id="sidebar_fixed">
                                <br /><br /><br />
                                <div className="container justify-content-center align-items-center">
                                    <div className="box_bid">
                                        <h2>Product Name</h2>
                                        <a className="close_panel_mobile"><i className="icon_close"></i></a>
                                        <div className="item_meta"> <h3>Redeem With <strong>{state.datatopass.price}  snapps</strong></h3>
                                        </div>
                                        <hr /> <a className="btn_1 full-width mb-2 modal_popup" onClick={() => setClicked(true)}>Snapp Now!</a>
                                    </div>
                                    <ul className="share-buttons">
                                        <li><a><i className="bi bi-instagram"></i></a></li>
                                        <li><a><i className="bi bi-facebook"></i></a></li>
                                        <li><a><i className="bi bi-twitter"></i></a></li>
                                        <li><a><i className="bi bi-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>

                    </div>
                </div>
            </main>
            <div className={`${ClickedSnappNow ? `` : `visually-hidden`}`}>
                <div class="mfp-bg my-mfp-zoom-in mfp-ready"></div>
                <div class="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabindex="-1" style={{ overflow: "hidden auto" }}><div class="mfp-container mfp-inline-holder"><div class="mfp-content"><div id="modal-dialog" class="zoom-anim-dialog">
                    <div class="modal_header">
                        <h3>Snapp Now!</h3>
                    </div>
                    <form>
                        <div class="sign-in-wrapper">
                            <p>You are about to purchase <strong>"{state.datatopass.title}"</strong> from <strong>{user_name}</strong></p>
                            <div class="form-group"> <label>Redeem With</label>
                                <input type="text" class="form-control" placeholder={`${state.datatopass.price}`} disabled="true" />
                            </div>
                            <ul>
                                <li>
                                    Product Cost <span>{state.datatopass.price} Snapps</span>
                                </li>
                                <li>
                                    Service fee 1.5%<span>{state.datatopass.price * (1.5 / 100) } Snapps</span>
                                </li>
                                <li>
                                    You will pay<span>{ Math.round(state.datatopass.price * ( 1 + (1.5 / 100)) *  10**3) / 10**3}  Snapps</span>
                                </li>

                            </ul>
                            <div class="text-center">
                                <input type="submit" value="Check Out" onClick={(e) => {e.preventDefault()}} class="btn_1 full-width mb-2" />
                            </div>
                        </div>
                    </form>
                    <button title="Click to Dismiss" type="button" onClick={() => setClicked(false)} class="mfp-close"></button></div></div></div></div>
            </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
