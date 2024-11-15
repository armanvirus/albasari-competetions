const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

   const musabaqaSchema = new Schema({
        SchoolName:{type:String, required:true, unique:true},
        school:{type:String, default:false},
        name:{type:String, required:true},
        bod:{type:String, required:true},
        riwaya:{type:String, required:true},
        category:{type:String, required:true},
        description:{type:String, required:true},
        batch:{ type:String, required:true}   
      });


   module.exports = mongoose.model("musabaqa", musabaqaSchema);