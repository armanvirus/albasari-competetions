const encryptions = require("../utils/encryptions")
module.exports = {
isAuthenticated:async(req,res,next)=>{
    const school = await encryptions.verifyToken(req);
    if(school){
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