const {Schema, model} =   require("mongoose");
const bcrypt = require("bcrypt");


const gameSchema = new Schema({
  name: {
    type: String,
  },
  moneyWon: {
    type: Number,
    default: 0,
  },
  tid: {
    type:String,
  },
  date: {
    type:String,
  },
});

const cartSchema = new Schema({
  name:{
    type:String,
  },
  price:{
    type:Number,
    default:0,
  },
  img:{
    type:String,
  },
  quantity:{
    type:Number,
    default:1
  },
})

const gamerSchema = new Schema({
   userName:{
      type: String,
      
   },
   password: {
      type: String,
      
   },
    email: {
        type: String,   
        unique:true 
    },
    country:{
      type:String,
      
    },
    walletMoney: {
      type: Number,
      default: 0

    },
    joiningTime: {
      type: Date,
      default: Date.now

    },
    verified:{
        type:Boolean,
        default:false
    },
    image:{
      type:String,   
    }
    ,  
    redeemed: {
      type: Number,
      default: 0
    },

    cart: {
      type:Number,
      default:0
    },

    games : [gameSchema] ,

    cartitems : [cartSchema] ,

   },
   {timestamp:true}
   )

   gamerSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    user.password = bcrypt.hash(user.password,10);
    next();
   })
  
   //now create a collection inside the database

   const gamer = new model("gamer",gamerSchema);
   
   module.exports=gamer;