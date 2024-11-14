const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

   const paymentSchema = new Schema({
        email:{type:String, required:true, unique:true},
        school:{type:String, default:false},
        ref:{type:String, default:false},
        amaountPaid:{type:String, required:true},
        batch:{ type:String, required:true}   
      });


   module.exports = mongoose.model("payment", paymentSchema);