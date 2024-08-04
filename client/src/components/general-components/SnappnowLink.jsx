import React from "react";
import { Link, useNavigate , useLocation } from 'react-router-dom';


const SnappnowLink = (props) => {
    const navigate = useNavigate();
    let location = useLocation();
    return (<Link  className={`btn_1 modal_popup lazy ${props.imageLoaded ? "" : "visually-hidden"} `} onClick={(e) => {
        e.preventDefault();
        navigate('/detail-page' , { state : {
            datatopass : props.datatopass
        }})
    }} >Snapp Now!</Link>)
}

export default SnappnowLink