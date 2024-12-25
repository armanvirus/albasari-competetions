const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

   const musabaqaSchema = new Schema({
        schoolName:{type:String, required:true},
        school:{type:String, required:true},
        name:{type:String, required:true},
        dob:{type:String, required:true},
        riwaya:{type:String, required:true},
        category:{type:String, required:true},
        description:{type:String, required:true},
        batch:{ type:String, required:true}   
      }, { timestamps: true });


   module.exports = mongoose.model("musabaqa", musabaqaSchema);