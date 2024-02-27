const express=require('express');
const User=require('../models/User.js');
const bcrypt=require('bcryptjs');
const router=express.Router();
const jwt=require('jsonwebtoken')


router.post('/login',async(req,res)=>{
      let {email,password,doctor}=req.body;
      try{
        if(doctor==undefined){
            doctor=false;
        }
        console.log(doctor,email)
        let user=await User.findOne({email,doctor});
        console.log(user)
       if(user!=null){
        let checkpassword=await bcrypt.compare(password,user.password);
        if(!checkpassword){
            throw "Incorrect password"        
        }
        console.log(doctor) 
        const payload={
            user:{
                id:user.id,
                name:user.name,
                doctor
            }
        }
        let token=jwt.sign(payload,process.env.SECRETKEY,{expiresIn:'10h'});
           res.cookie("token",token);   
           res.json({data:{token}});
       }else{
           throw "User doesnt exists"    
    }
      }catch(err){
        console.log("error",err) 
        res.status(400).json({error:err});
      }
      
})
router.post('/new',

async (req,res)=>{
    const {name,doctor,email,password}=req.body;
    try{
        let user=await User.findOne({email,doctor});
        if (user!=null) {
                 throw "User exists"   
        }else{
            const newuser=new User({name,doctor,email,password})
            console.log(newuser);
            let salt=await bcrypt.genSalt(10);
            let hashedpassword=await bcrypt.hash(newuser.password,salt);
                newuser.password=hashedpassword;
                newuser.save();
            const payload={
                user:{
                    id:newuser.id,
                    name:newuser.name,
                    doctor
                }
            }
            let token =await jwt.sign(payload,process.env.SECRETKEY,{expiresIn:'1h'});
            if(token){
                
                res.send({data:{token}});
            }
        }
    } catch(err){
        res.status(400).json({error:err});
        console.error(err);
    }
});
module.exports=router;
