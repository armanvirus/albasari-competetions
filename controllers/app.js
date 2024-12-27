const musabaqaModel = require('../database/musabaqaModel')
const quizModel = require('../database/quiz')
const schoolModel = require("../database/UserModel")
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
            schoolName:req.user.name,
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
        const musabaqa =await musabaqaModel.find({school:req.user._id, batch}).sort({hizb:1})
        const quiz = await quizModel.find({school:req.user._id, batch})
        // res.json({status:200, participants:musabaqa})
        // console.log(musabaqa,quiz)
        res.render('pages/document',{musabaqa,quiz, error:false})
    },
    quiz:async(req,res)=>{
        const {name,dob} = req.body;
        if(!name || !dob)
            return res.render('pages/hadith',{error:true, msg:"please fill all fields"})
        const newStudent = new quizModel({
            schoolName:req.user.name,
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
    editApplication: async(req,res)=> {
        const musabaqa =await musabaqaModel.find({school:req.user._id, batch}).sort({hizb:1})
            const quiz = await quizModel.find({school:req.user._id, batch})
        const id = req.params.id;
        const student = await musabaqaModel.findById(id)
        if(!student)
            return res.render('/app/document',{error:true, msg:"something went wrong", musabaqa, quiz} )
        res.render('pages/edit',{error:false, msg:'', student}

        )},
        edithApplication: async(req,res)=> {
            const musabaqa =await musabaqaModel.find({school:req.user._id, batch}).sort({hizb:1})
            const quiz = await quizModel.find({school:req.user._id, batch})
        const id = req.params.id;
        const student = await quizModel.findById(id)
        if(!student)
            return res.render('/app/document',{error:true, msg:"something went wrong", musabaqa, quiz} )
        res.render('pages/edith',{error:false, msg:'', student}

        )},
        edit:async(req,res)=>{
            const musabaqa =await musabaqaModel.find({school:req.user._id, batch}).sort({hizb:1})
            const quiz = await quizModel.find({school:req.user._id, batch})
            const {name,dob,riwaya,description, category} = req.body;
            const id = req.params.id
            if(!name || !dob || !riwaya || !description || !category|| !id)
                return res.render('pages/document', 
            {error:true, msg:`unable to edit participant`,
            musabaqa, quiz
            })
            const updatedUser = await musabaqaModel.findByIdAndUpdate(
                id,
                { $set: { name,dob,riwaya,description, category} },
                { new: true }
              );

              if(!updatedUser)
                return res.render('pages/document', 
               {error:true, msg:`unable to edit participant`, musabaqa, quiz})
                res.render('pages/document', {error:true, msg:`participant successfully updated`,
                musabaqa, quiz})
        },
        edith:async(req,res)=>{
            const musabaqa =await musabaqaModel.find({school:req.user._id, batch}).sort({hizb:1})
            const quiz = await quizModel.find({school:req.user._id, batch})
            const {name,dob} = req.body;
            const id = req.params.id
            if(!name || !dob || !id)
                return res.render('pages/document', {error:true, msg:`unable to edit participant`, musabaqa, quiz})
            const updatedUser = await quizModel.findByIdAndUpdate(
                id,
                { $set: { name,dob} },
                { new: true }
              );

              if(!updatedUser)
                return res.render('pages/document', {error:true, msg:`unable to edit participant`, musabaqa, quiz})
                res.render('pages/document', 
                {error:true, msg:`participant successfully updated`,musabaqa, quiz })
        },
        pay: async(req,res)=>{
            /*const payload = req.body;
            const payvessel_signature = req.header("payvessel-http-signature");
            console.log("signature log",payvessel_signature)
            // const ip_address = req.connection.remoteAddress ;
            const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const secret = 'PVSECRET-';
            const hash = crypto.createHmac('sha512', secret)
              .update(JSON.stringify(payload))
              .digest('hex');
          console.log("hash log", hash)
            if (
                // payvessel_signature === hash &&
                 ip_address === '162.246.254.36') {
              const data = payload;
              const amount = parseFloat(data.order.amount);
            //   const settlementAmount = parseFloat(data.order.settlement_amount);
            //   const fee = parseFloat(data.order.fee);
              const reference = data.transaction.reference;
            //   const description = data.order.description;
              // Check if reference already exists in your payment transaction table
              const alreadyPayed = await historyModel.findOne({transactionReference:reference})
              if (!alreadyPayed) {
                const user = await userModel.findOne({email:data.customer.email})
                const wallet = await walletModel.findOneAndUpdate({
                    user: user._id
                },
                    { $inc: { available: (amount - 50), total: (amount - 50) } },
                    { new: true },) 
                    
                const newHistory = new historyModel({
                    user: wallet.user,
                    service: "funding",
                    beneficiary: {
                        name: "vrs data",
                        payload: data.virtualAccount.virtualAccountNumber
                    },
                    amount,
                    transactionReference: reference
                })
                await newHistory.save()
                // Fund user wallet here
                res.status(200).json({ message: 'success' });
              } else {
                res.status(200).json({ message: 'transaction already exist' });
              }
            } else {
                console.log("hash compare",payvessel_signature === hash)
                console.log("ip compare",ip_address === '162.246.254.36')
              res.status(400).json({ message: 'Permission denied, invalid hash or ip address.' });
            } */
        },
        adminPage: async (req,res)=>{
            
            const schools = await schoolModel.countDocuments({type:"school"});
            const musabaqaCounts = await musabaqaModel.countDocuments()
            const quizCounts = await quizModel.countDocuments()
            const recentMuasabaqa = await musabaqaModel.find()
            .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
            .limit(3);
            const recentQuiz = await quizModel.find()
            .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
            .limit(3);
            res.render('pages/admin', { error: false, msg: '', data:{
                funds: schools * 5000,
                schools,
                students: musabaqaCounts + quizCounts,
                payments: schools,
                applications:schools,
                recent:[recentMuasabaqa, recentQuiz]

            } });
        },
        adminSchools: async(req,res)=>{
            // const schools = await schoolModel.find();
            // const mongoose = require('mongoose');

    // Get all users with populated "school" field
    const users = await schoolModel.find()
    const quiz = await quizModel.find()
    const musabaqa = await musabaqaModel.find()
// /create a new array with user data and number of students that corresponds to the user and if students exist in both quiz and musabaqa the object should contents programs and value of two if exist in one value 1 else 0
    const data = users.map(user => {        
        const students = musabaqa.filter(student => student.school == user._id).length; 
        const students2 = quiz.filter(student => student.school == user._id).length;    
        const program = students > 0 && students2 > 0 ? 2 : students > 0 || students2 > 0 ? 1 : 0;
        return {
            user,
            programs: program,
            totalStudents: students + students2,
        };
    }
    );
    console.log(data)
                res.render('pages/admin_schools', { error: false, msg: '', data});
        }
}