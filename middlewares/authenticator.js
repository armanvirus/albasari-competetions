const encryptions = require("../utils/encryptions")
const User = require('../database/UserModel')
module.exports = {
isAuthenticated:async(req,res,next)=>{
    const school = await encryptions.verifyToken(req);
    if(school){
        const user = await User.findOne({ email:school.user });
        req.user = user
        return next()
    }

    res.redirect('/user/auth/login')

},
skipAuth:async(req,res,next)=>{
    const school = await encryptions.verifyToken(req);
    if (!school) {
        return next();
      }
      res.redirect('/dashboard');  
}
}