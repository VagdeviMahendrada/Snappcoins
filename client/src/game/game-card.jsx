import React from "react";

const GameCard = () => {
  return (
    <div className="main_profile">
      <div >
        <div className="author_thumb veryfied">
          <figure className="h-100">
            <img
              className="mb-4"
              src="assets/img/tic-tac-toe.jpeg"
              alt=""
              style={{ width: "175px", height: "auto" }}
            />
          </figure>
        </div>
      </div>
      <h3 className="content-h2">
        <h3>Prize Info:</h3>
        <div class="rules-container">
          <div class="prize-info">
            <p>
              If you win, you will receive <strong>10,000 Snapps</strong>.
            </p>
            <p>
              If you tie, you will receive <strong>5,000 Snapps</strong>.
            </p>
            <p>If you lose, unfortunately, you won't receive any Snapps.</p>
          </div>
          <p>
            Don't forget to click the "Add to Wallet" button if you win Snapps!
          </p>
        </div>
      </h3>
    </div>
  );
};

export default GameCard;
