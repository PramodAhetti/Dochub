const express=require('express')
const router=express.Router();
const userauth=require('../middleware/auth').userauth;
const doctorauth=require('../middleware/auth').doctorauth;
const reports=require('../models/Report')
const multer=require('multer');


const upload=multer();

//get api/users
//test route
//route to get all the posts
router.post('/myreport', userauth, async (req, res) => {
   try{
    const allposts=await reports.find({ownedId:req.body.userId}) 
    res.json({data:allposts});
}catch(err){
    res.status(400).send({error:err})
   } 
});


//route to add new post
router.post('/new',userauth,async (req,res)=>{
     try{
        let newReport=new reports({
            ownedId:req.body.userId,
            report:req.body.report,
            date:Date.now()
         });
         await newReport.save();
         return res.send({msg:'post saved'});
     }catch(err){
        res.status(400).send({error:"server error"});
        console.log(err);    
    }

});

//do from here tomorrow

router.post('/upload',upload.single('file'),doctorauth,async(req,res)=>{
    try{
     if(!req.file){
        throw "No file was uploaded";
     }
     const report=req.file.buffer.toString('base64');
     console.log(report);
     const ownedId=req.body.clientId;
     let newReport=new reports({
            ownedId,
            report,
            message:req.body.message,
            date:Date.now()
         });
         await newReport.save();  

     res.send({"msg":"saved the report"})

    }catch(err){
        res.status(400).send({error:err})
    }
})
//route to delete already existing posts
router.post('/delete',userauth,async (req,res)=>{
    try{
        let post=await reports.findById(req.body.postId)
        if(post){
            post.delete();
            return res.send({msg:"deleted the post"})
        }else{
            throw "Post not found"; 
        }
    }catch(err){
       res.status(400).send({error:err});
    }

});

router.post('/addcomment',userauth,async(req,res)=>{
    try{
       let report=await reports.findById(req.body.postId);
       report.comment.push({user:req.body.userId,comment:req.body.comment});
       await report.save();
       res.send({msg:"commented to this post"})
    }catch(err){
        console.log(err);
      res.status(400).send({error:"server error"})
    }
})

router.post('/test',async(req,res)=>{
    try{
      let data=await reports.findOne({ownedId:req.body.id});
      
      res.send(data);
    }catch(err){
        res.status(400).send({error:err})
    }
})







// router.delete('/deletecomment',userauth,async(req,res)=>{
//   try{
//      let post=await reports.findById(req.body.post_id);
//      let comment =post.comment.find((data)=>{return (data.user.toString()===req.body.user_id && data.index.toString()===req.body.index)});
//      post.comment.remove(comment);
//      await post.save();
//      res.send({msg:"comment on this post is deleted"})
//   }catch(err){
//     res.status(400).send({error:"server error"})
//   }
// })
module.exports=router;