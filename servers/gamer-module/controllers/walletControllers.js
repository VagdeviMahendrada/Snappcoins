const wallet = require("../models/walletModel");
const User = require("../models/gamerModel");

exports.wallet = async (req, res) => {
  try {
    const { gamerId, num_of_tokens } = req.body;

    const { userId } = await User.findById(req.query.uid);

    const createwallet = await wallet.create({
      userId,
      gamerId,
      num_of_tokens,
    });

    res.status(200).send({ msg: "wallet creation Successful" });
  } catch (error) {
    console.log(error);
  }
};

exports.getCoins = async (req, res) => {
  try {
    const user = await User.findById(req.query.id).select("gamerId");
    res
      .status(200)
      .json({ msg: "snap coins displayed successfully..", num_of_tokens });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};



exports.addMoney = async (req, res) => {
  try {
    const { id, money, gameName } = req.query;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentYear = new Date().getFullYear().toString();
    const randomDigits = Math.floor(Math.random() * 9000) + 1000;
    const tId = `#ID ${currentYear}${randomDigits}`;
    
    //update total wallet money

    user.walletMoney += parseInt(money);

    //push the game details into the gamer account

    user.games.push({
      name: gameName,
      moneyWon: parseInt(money),
      tid: tId,
      date: new Date().toISOString(),
    });

    await user.save();  //save the gamer 

    return res.status(200).json({ message: "Wallet money updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



