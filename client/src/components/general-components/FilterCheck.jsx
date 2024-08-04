import React from "react";

const FilterCheck = (props) => {
    return (<li>
        <label className="container_check">{props.name}<small>{props.count}</small>
            <input type="checkbox" onChange={(e) => props.handleCheck(e)} value={props.name} />
            <span className="checkmark"></span>
        </label>
    </li>)
}

export default FilterCheck;