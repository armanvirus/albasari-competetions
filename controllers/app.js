const musabaqaModel = require('../database/musabaqaModel')
const batch = new Date().getFullYear()
module.exports = {
    application:async(req,res)=>{
        const {name,dob,riwaya,description, category} = req.body;
        if(!name || !dob || !riwaya || !description || !category)
            // return res.render('../pages/dashboard', {error:true, msg:'please fill all the fields'})/
        return res.json({status:401, msg:'please fill all the fields'})
        const categoryAdded = await musabaqaModel.countDocuments({
            school:req.user._id,
            batch,        
            category
          });
        if(categoryAdded == 2 )
            return res.json({msg:'maximum number of applicants is reached'})
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
            return res.json({status:401, msg:'unable to add participant'})
            // return res.render('../pages/dashboard', {error:true, msg:'error while addig participant'})
            res.json({status:401, msg:'participant added successfully'})
            // res.render('../pages/dashboard', {success:true, msg:'participant added successfully'})
    },
    participants:async(req,res)=>{
        const musabaqa = musabaqaModel.find({school:req.user._id, batch})
        res.json({status:200, participants:musabaqa})
    },
    quiz:async(req,res)=>{
        const {name,dob} = req.body;
    },
}