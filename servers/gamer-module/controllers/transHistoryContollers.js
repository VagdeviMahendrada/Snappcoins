const transaction = require("../models/transHistoryModel");
const mongoose = require('mongoose');
//console.log(transaction);
exports.additem = async (req, res) => {
  try {
    const {user_id} = req.query
    const { orderStatus,snaps } = req.body;
    //console.log(orderStatus);
    //console.log(user_id);

    //generate random transaction id :

    const currentYear = new Date().getFullYear().toString();
    const randomDigits = Math.floor(Math.random() * 9000) + 1000;
    const tId = `#ID ${currentYear}${randomDigits}`;

    //console.log(tId);
    
    const createTransaction = await transaction.create( {transactionId:tId,orderStatus,user_id,snaps} );
  
    res.status(200).send({ msg: "Transaction stored successfully" });

  } catch (error) {
    console.log(error);
  }
};

//const { Types } = require('mongoose');

 // Update the path to your model file

 exports.displayitem = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const pagenum = req.query.pagenum;
    const size = req.query.size;
    const searchTerm = req.query.searchTerm;

    //console.log("user_id:", user_id);
    //console.log("searchTerm:", searchTerm);

    const skip = size * (pagenum - 1);
    const limit = parseInt(size);

    let query = { user_id };

    if (searchTerm) {
      const trimmedSearchTerm = searchTerm.trim();
      //console.log("trimmedSearchTerm: ", trimmedSearchTerm);
      query.orderStatus = { $regex: trimmedSearchTerm, $options: 'i' };
    }
    
    const transactions = await transaction.find(query);
    revTrans = transactions.reverse();

    let count;

    if (searchTerm) {
      count = await transaction.countDocuments(query);
    } else {
      count = await transaction.countDocuments({ user_id });
    }

    //console.log(count);


    let pendingOrders = 0;
    let redeem_total=0;

    const orders = await transaction.find({ user_id });

    orders.forEach((transaction) => {
      if (transaction.orderStatus === 'In transit') {
        pendingOrders++;
      }
      if(transaction.orderStatus === 'In transit' || transaction.orderStatus === 'Delivered'){
        redeem_total=redeem_total+transaction.snaps;
      }
    });

    //console.log("redd: ",redeem_total);
    // Slice the revTrans array based on skip and limit
    const slicedTransactions = revTrans.slice(skip, skip + limit);

    res.status(200).send({
      transactions: slicedTransactions,
      status: true,
      msg: "Products displayed successfully",
      total_counts: count,
      pendingOrders: pendingOrders,
      redeemed: redeem_total,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error}` });
  }
};







