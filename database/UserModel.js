const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

   const UserSchema = new Schema({
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        phone:{type:String, required:true},
        address:{type:String, required:true},
        name:{type:String, required:true},
        type:{type:String, required:true, 'default': "school"},
        verified:{type:Boolean, default:false},
        createdOn:{ type: Date, 'default': Date.now }   
      });


   module.exports = mongoose.model("useracc", UserSchema);
