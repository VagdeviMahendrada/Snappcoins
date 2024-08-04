import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Footer from "../components/general-components/Footer";
import { gamerProfile } from "../redux/actions/gamerAction";
import useFetch from "../hooks/useFetch-gamer";
import Header from "./game-header";
import Card from "./gamer-card";
import GameCard from "./game-card";

const Game = () => {
  const [gamer_name, setGamerName] = useState("");
  const [gamer_id, setGamerId] = useState("");
  const [gamer_coins, setGamerCoins] = useState("");

  const [user, setUser] = useState("");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const id = params.get("id");

  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    const config = {
      url: "/profile",
      method: "get",
      headers: { Authorization: token },
    };
    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setUser(data.user);
        console.log(data.user);
        dispatch(gamerProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token, dispatch]);

  useEffect(() => {
    setGamerName(user.userName);
    setGamerId(user?._id);
    setGamerCoins(user.walletMoney);
  }, [user]);

  useEffect(() => {
    if (!token) {
      navigate("/game-login", {
        state: { message: "You are not logged in." },
      });
    } else {
      fetchUser();
    }
  }, [fetchUser]);

  useEffect(() => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#reset");
    const announcer = document.querySelector(".announcer");
    const addBtn = document.getElementById("add-to-wallet");
    const snappcoin_count = document.getElementById("snappcoins");
    var gameMessage = document.getElementById("game-coins-message");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);

        isGameActive = false;
        return;
      }

      if (!board.includes("")) announce(TIE);
    }

    var tokensToAllocate = 0;

    const announce = (type) => {
      switch (type) {
        case PLAYERO_WON:
          announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
          gameMessage.textContent = "Oops! Better luck next time!";
          break;
        case PLAYERX_WON:
          announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
          addBtn.style.display = "";
          gameMessage.innerHTML =
            "Yay! You won 10000 Snappcoins<br>Add them to your wallet now!";
          tokensToAllocate = 10000;
          break;
        case TIE:
          announcer.innerHTML = "Tie";
          addBtn.style.display = "";
          gameMessage.innerHTML =
            "Yay! You won 5000 Snappcoins<br>Add them to your wallet now!";
          tokensToAllocate = 5000;
      }

      if (addBtn.style.display === "") {
        addBtn.addEventListener("click", () => {
          fetch(
            "http://localhost:3001/gaming-vendor-wallet/allocate-snappcoins",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                vendor_id: "GV002",
                vendor_name: "99 Games",
                vendor_email: "siddharthjain1220@gmail.com",
                gamer_id: gamer_id,
                gamer_name: gamer_name,
                tokensToAllocate,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              const params = new URLSearchParams(window.location.search);
              const id = params.get("id");
              const game_name = "Tic-Tac-Toe";
              fetch(
                `http://localhost:3004/api/wallet/addMoney?id=${id}&money=${tokensToAllocate}&gameName=${game_name}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Request failed.");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log(data.message);
                })
                .catch((error) => {
                  console.log(error);
                });
              toastFunction("Snapps have been credited to your account!");
              addBtn.style.display = "none";
              gameMessage.textContent = "";
            })
            .catch((error) => {
              toastFunction(error);
            });
        });
      }
      announcer.classList.remove("hide");
    };

    const isValidAction = (tile) => {
      if (tile.innerText === "X" || tile.innerText === "O") {
        return false;
      }

      return true;
    };

    const updateBoard = (index) => {
      board[index] = currentPlayer;
    };

    const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const computerAction = () => {
      if (isGameActive) {
        const availableTiles = tiles.filter((tile) => tile.innerText === "");
        const randomIndex = Math.floor(Math.random() * availableTiles.length);
        const tile = availableTiles[randomIndex];
        const index = tiles.indexOf(tile);
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
      }
    };

    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
      isGameActive = true;
      announcer.classList.add("hide");

      if (currentPlayer === "O") {
        changePlayer();
      }

      tiles.forEach((tile) => {
        tile.innerText = "";
        tile.classList.remove("playerX");
        tile.classList.remove("playerO");
      });

      if (currentPlayer === "O") {
        computerAction();
      }

      addBtn.style.display = "none";
      gameMessage.textContent = "";
    };

    tiles.forEach((tile, index) => {
      tile.addEventListener("click", () => {
        userAction(tile, index);
      });
    });

    resetButton.addEventListener("click", resetBoard);

    function userAction(tile, index) {
      if (isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
        if (isGameActive) {
          computerAction();
        }
      }
    }
  }, [gamer_id]);

  // Function to display a toast message
  function toastFunction(message) {
    const x = document.getElementById("toast");
    x.textContent = message;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  return (
    <>
      <Header gamer_name={gamer_name} gamer_coins={gamer_coins} />
      <main>
        <div
          className="hero_single inner_pages author_page jarallax"
          style={{ height: "35vh", width: "100%" }}
          data-jarallax
        >
          <img
            className="jarallax-img"
            src="assets/img/hero_general.jpg"
            alt=""
          />
          <div
            className="opacity-mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-7">
                  <h1>X &nbsp;&nbsp; The Tic-Tac-Toe Game &nbsp;&nbsp; O</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="wave hero"></div>
        </div>

        <div className="container" style={{ marginTop: "10rem" }}>
          <div className="row">
            <div className="col-3" style={{ margin: "0" }}>
              <div className="container">
                <Card
                  gamerName={gamer_name}
                  id={gamer_id}
                  walletMoney={gamer_coins}
                />
              </div>
            </div>
            <div className="col-5">
              <div className="main_profile" style={{ background: "none", padding: "0" }}>
                <section className="display">
                  Player <span className="display-player playerX">X</span>'s
                  turn
                </section>
                <section className="tile-container">
                  <div className="tile" />
                  <div className="tile" />
                  <div className="tile" />
                  <div className="tile" />
                  <div className="tile" />
                  <div className="tile" />
                  <div className="tile" />
                  <div className="tile" />
                  <div className="tile" />
                </section>
                <section className="display announcer hide"></section>
                <div>
                  <label
                    className="display"
                    id="game-coins-message"
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <div id="error-message" className="error-message"></div>
                  <div id="toast" className="center">
                    <div className="checkicon">
                      <i className="fas fa-check-square"></i>
                    </div>
                  </div>
                  <section className="controls">
                    <button id="reset">Reset</button>
                    <button id="add-to-wallet" style={{ display: "none" }}>
                      Add to Wallet
                    </button>
                  </section>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="container">
                <GameCard />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Game;
