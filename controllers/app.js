const musabaqaModel = require('../database/musabaqaModel')
const batch = new Date().getFullYear()
module.exports = {
    application:async(req,res)=>{
        const {name,dob,riwaya,description, category} = req.body;
        if(!name || !dob || !riwaya || description)
            return res.render('../pages/dashboard', {error:true, msg:'please fill all the fields'})
        // const numOfApplicant = musabaqaModel.
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
            return res.render('../pages/dashboard', {error:true, msg:'error while addig participant'})
            res.render('../pages/dashboard', {success:true, msg:'participant added successfully'})
    },
    participants:async(req,res)=>{
        const musabaqa = musabaqaModel.find({school:req.user._id})
    },
    quiz:async(req,res)=>{
        const {name,dob} = req.body;
    },
}