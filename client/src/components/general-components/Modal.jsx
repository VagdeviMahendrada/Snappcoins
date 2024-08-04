import React from "react";

const Modal = (props) => {
    return(<div  className="zoom-anim-dialog">
        <div className="modal_header">
            <h3>Snapp Now!</h3>
        </div>
        <form>
            <div className="sign-in-wrapper">
                <p>You are about to purchase <strong>"Amazing Art" #304</strong> from <strong>George Lucas</strong></p>
                <div className="form-group"> <label>Redeem With</label>
                    <input type="text" className="form-control" placeholder="3.5 snapps" disabled />
                </div>

                <ul>
                    <li>
                        Your balance <span>8.498  Snapps</span>
                    </li>
                    <li>
                        Service fee 1.5%<span>0.125  Snapps</span>
                    </li>

                </ul>
                <div className="text-center"> <input type="submit" className="btn_1 full-width mb-2" formaction="detail-page.html" value="Snapp It!" />
                    <input type="submit" value="Cancel" className="btn_1 full-width outline" />
                </div>
            </div>
        </form>

    </div>)
}


export default Modal;