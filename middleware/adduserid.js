const User=require('../models/User');
let adduserid=async (req,res,next)=>{
   try {
       let name=req.body.clientName;
       let user_data=await User.findOne({name})  
       if(user_data==null){
        throw "user not found"
       }else{
        req.body.userId=user_data.id;
        next();
       }
   } catch (err) {
       res.status(400).send({err:err});
   }   
}
module.exports=adduserid; 