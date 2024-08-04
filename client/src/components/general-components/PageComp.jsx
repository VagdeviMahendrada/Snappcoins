import React from "react";
import {Link} from "react-router-dom"

function PageComp(props) {

    return(
            <Link className={ props.isActive && "active"} to="#" onClick={(e) => { return props.handleClick(e)}}>{props.pagenum}</Link>
    )
}


// {props.isActive && "Active"}

export default PageComp;