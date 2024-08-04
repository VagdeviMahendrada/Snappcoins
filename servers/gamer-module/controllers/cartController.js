const User = require("../models/gamerModel");


exports.itemsCollected = async (req, res) => {
  try {
    const uid = req.query.uid;
    const productName = req.query.name;
    const productprice = req.query.price;
    const productImage = req.query.imageSrc;
    const user = await User.findById(uid);
    //console.log(user)
    //console.log(productImage)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    user.cart += 1;
     //console.log(user.cartitems.findIndex((item)=>item.id !== 1))
    // const existingProduct = await User.findOne({name:productName})
    // if(existingProduct){
    //     res.status(200).send({msg:'Already added Product in your cartItem'})
    // }
    // else{
      user.cartitems.push({ name: productName, price: productprice,img:productImage });
      await user.save();
  
      res.status(200).send({ msg: "Added To Cart Successfully" });
    //}
   
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.itemsDisplay = async (req, res) => {
  try {
    const uid = req.query.uid;
    const user = await User.findById(uid);
    const pagenum = req.query.pagenum;
    const size = req.query.size;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const skip = size * (pagenum - 1);
    const limit = parseInt(size);

    const itemslist = user.cartitems;
    const itemslistLength = itemslist.length; 

    const sliceditems  = itemslist.slice(skip, skip + limit);
    //console.log(sliceditems);
    
    res.status(200).json({ items: sliceditems, length: itemslistLength }); // You can include the length in the response if you need it
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.itemsDelete = async (req, res) => {
  try {
    const uid = req.query.uid;
    const productid = req.query.itemId;

    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const itemIndex = user.cartitems.findIndex((item) => item._id.toString() === productid);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    user.cartitems.splice(itemIndex, 1);
    user.cart = user.cartitems.length; 

    await user.save();

    res.status(200).json({ msg: "Item Deleted Successfully" });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.itemQuantity = async (req, res) => {
  try {
    const uid = req.query.uid;
    const num = parseInt(req.query.num);
    const productid = req.query.itemId;

    const user = await User.findById(uid);

    if (!user) {
      return res.status(400).json({ msg: "User not Found" });
    }

    const itemIndex = user.cartitems.findIndex((item) => item._id.toString() === productid);

    if (itemIndex === -1) {
      return res.status(404).json({ msg: "Item not found in the cart" });
    }

    
    if (num === -1) {
      if (user.cartitems[itemIndex].quantity > 1) {
        user.cartitems[itemIndex].quantity = user.cartitems[itemIndex].quantity + num;
      } else {
        return res.status(400).json({ msg: "Quantity cannot be reduced further" });
      }
    } else {
      user.cartitems[itemIndex].quantity = user.cartitems[itemIndex].quantity + num;
    }

    const finalQuantity = user.cartitems[itemIndex].quantity;
    //console.log(finalQuantity)
    await user.save();

    res.status(200).json({ finalQuantity: finalQuantity, msg: "Quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal error" });
  }
};


