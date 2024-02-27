let jwt=require('jsonwebtoken');


async function userauth(req,res,next){
    try{
        req.body.token=req.cookies.token;
        let token=await jwt.verify(req.body.token,process.env.SECRETKEY);
        req.body.userId=token.user.id; 
        req.body.name=token.user.name;
        req.body.doctor=token.user.doctor;
        next();
    }catch(err){
        res.status(400).send({err:"login required"});
    }
}


async function doctorauth(req,res,next){
    try{
        let token=await jwt.verify(req.body.token,process.env.SECRETKEY);
        req.body.userId=token.user.id; 
        req.body.name=token.user.name;
        req.body.doctor=token.user.doctor;
        if(token.user.doctor){
        console.log("verified as doctor")
            next();
        }else{
            throw "Need to be doctor";
        }
    }catch(err){
        res.status(400).send({err:"login required"});
    }
}

module.exports={userauth,doctorauth};