const musabaqaModel = require('../database/musabaqaModel')
const quizModel = require('../database/quiz')
const batch = new Date().getFullYear()
module.exports = {
    dashboard:async(req,res)=>{
        const totalQuiz = await quizModel.countDocuments({
            school:req.user._id,
            batch,        
          });
          console.log(totalQuiz)
        const students = await musabaqaModel.find({school:req.user._id});
       var uniqueCategories;
        if(students){
            // Use reduce to create an array with unique categories
    uniqueCategories = students.reduce((acc, curr) => {
    // Check if the category already exists in the accumulator
    if (!acc.some(item => item.category === curr.category)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  
  var registeredCategories = students ? uniqueCategories.length : 0
        }
        res.render('pages/dashboard',{
             name:req.user.name,
             categories:registeredCategories,
            totalStudents: students ? (students.length + totalQuiz) : 0})

    },
    application:async(req,res)=>{
        const {name,dob,riwaya,description, category} = req.body;
        if(!name || !dob || !riwaya || !description || !category)
            return res.render('pages/application', {error:true, msg:'please fill all the fields'})
        // return res.json({status:401, msg:'please fill all the fields'})
        const categoryAdded = await musabaqaModel.countDocuments({
            school:req.user._id,
            batch,        
            category
          });
        if(categoryAdded == 2 )
            return res.render('pages/application',{error:true, msg:'maximum number of applicants is reached'})
            // return res.json({msg:'maximum number of applicants is reached'})
        const newStudent = new musabaqaModel({
            name,
            dob,
            riwaya,
            description,
            category,
            SchoolName:req.user.name,
            school:req.user._id,
            batch

        })

        const savedStudent = await newStudent.save();
        if(!savedStudent)
            // return res.json({status:401, msg:'unable to add participant'})
            return res.render('pages/application', {error:true, msg:'error while addig participant'})
            // res.json({status:401, msg:'participant added successfully'})
            res.render('pages/application', {error:true, msg:'participant added successfully'})
    },
    participants:async(req,res)=>{
        const musabaqa = musabaqaModel.find({school:req.user._id, batch})
        res.json({status:200, participants:musabaqa})
    },
    quiz:async(req,res)=>{
        const {name,dob} = req.body;
        if(!name || !dob)
            return res.render('pages/hadith',{error:true, msg:"please fill all fields"})
        const newStudent = new quizModel({
            schoolName:req.user._id,
            school:req.user._id,
            name,
            dob,
            batch
        })

        const savedStudent = await newStudent.save();
        if(!savedStudent)
            // return res.json({status:401, msg:'unable to add participant'})
            return res.render('pages/hadith', {error:true, msg:'error while addig participant'})
            // res.json({status:401, msg:'participant added successfully'})
            res.render('pages/hadith', {error:true, msg:'participant added successfully'})
    },
}