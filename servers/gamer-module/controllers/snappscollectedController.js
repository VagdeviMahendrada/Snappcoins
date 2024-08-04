const User = require("../models/gamerModel");


exports.snappsCollected = async (req, res) => {
  try {
    const uid = req.query.uid;
    const pagenum = req.query.pagenum;
    const size = req.query.size;
    const tID = req.query.tID;

    //console.log("tID from frontend: ", tID);

    const user = await User.findById(uid);

    const skip = size * (pagenum - 1);
    const limit = parseInt(size);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let totalLength, gamesplayed;

    if (tID) {
      // Search transactions based on tID
      const transactions = user.games.filter((game) => game.tid.trim().toLowerCase() === tID.trim().toLowerCase());

      console.log("transactions: ", transactions);

      if (transactions.length === 0) {
        return res.status(404).json({ error: "Transactions not found" });
      }

      gamesplayed = transactions;
      totalLength = transactions.length;

    } else {
      const gameslist = user.games.slice().reverse();
      totalLength = gameslist.length;
      gamesplayed = gameslist.slice(skip, skip + limit);
    }

    res.status(200).json({ games: gamesplayed, total_counts: totalLength });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



