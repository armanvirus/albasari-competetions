const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

   const QuizSchema = new Schema({
        SchoolName:{type:String, required:true, unique:true},
        school:{type:String, default:false},
        name:{type:String, required:true},
        bod:{type:String, required:true},
        batch:{ type:String, required:true}   
      });


   module.exports = mongoose.model("Quiz", QuizSchema);