import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterCheck from "./FilterCheck";
import { Fade } from "react-awesome-reveal"
 

function Filter({ children }) {
    const [ClickedCat, setClickedCat] = useState(false)
    const [ClickedRange, setClickedRange] = useState(false)

    return (
        <aside className="col-lg-3" id="sidebar_fixed">
            <div className="filter_col">
                <div className="inner_bt"><a href="#" className="open_filters"><i className="bi bi-x"></i></a></div>
                <div className="filter_type">
                    <h4><a href="" data-bs-toggle="collapse" className={ClickedCat ?  "collapsed closed" : "opened"} onClick={(e) => {
                        e.preventDefault();
                        setClickedCat((prev) => !prev)
                    }} aria-expanded={ClickedCat ? "false" : "true"} >Categories</a></h4>
                    <div className={`collapse ${ClickedCat ? "" : "show"}` } id="">
                        <ul>
                            {children[0]}
                        </ul>
                    </div>
                </div>
                <div className="filter_type">
                    <h4><a href="" data-bs-toggle="collapse" className={ClickedRange ? "collaped closed" : "opened"} onClick={(e) => {
                        e.preventDefault();
                        setClickedRange((prev) => !prev)
                    }} aria-expanded={ClickedRange ? "false" : "true"} >Snapps</a></h4>
                    <div className={`collapse ${ClickedRange ? "" : "show"}`}>
                        {children[1]}
                    </div>
                </div>
                {/* <div className="buttons">
                    <a href="#0" className="btn_1 full-width outline">Filter</a>
                </div> */}
            </div>
        </aside>
    )
}


export default Filter;