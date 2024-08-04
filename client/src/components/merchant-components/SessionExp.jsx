import React from "react";

function SessionExp() {
    return (<div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch static backdrop modal
        </button>
        <div className=" modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div className="modal-dialog  modal-dialog-centered" style={{width : 30+"rem"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-1" id="staticBackdropLabel">Session Expired</h1>
                    </div>
                    <div className="modal-body fs-5">
                        You have been logged out.
                    </div>
                    <form action="/login" method="get">
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
}


export default SessionExp;