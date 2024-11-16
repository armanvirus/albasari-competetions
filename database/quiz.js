const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

   const QuizSchema = new Schema({
        schoolName:{type:String, required:true},
        school:{type:String, default:false},
        name:{type:String, required:true},
        dob:{type:String, required:true},
        batch:{ type:String, required:true}   
      });


   module.exports = mongoose.model("Quiz", QuizSchema);