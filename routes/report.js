const express = require('express')
const router = express.Router();
const userauth = require('../middleware/auth').userauth;
const doctorauth = require('../middleware/auth').doctorauth;
const reports = require('../models/Report');
const pdf = require('../models/files');
const multer = require('multer');
const adduserid=require('../middleware/adduserid')

const upload = multer();

//get api/users
//test route
//route to get all the posts
router.post('/myreport', userauth, async (req, res) => {
    try {
        const allposts = await reports.find({ ownedId: req.body.userId })
        res.json({ data: allposts });
    } catch (err) {
        res.status(400).send({ error: err })
    }
});


router.post('/new', upload.single('file'),adduserid, userauth, async (req, res) => {
    try {
        if (!req.file) {
            throw "No file was uploaded";
        }
        const report = req.file.buffer.toString('base64');
        console.log(report);
        let newfile = new pdf({
            data:report 
        })
        await newfile.save();
        console.log("this is from the mongodb: ",req.body.userId)
        let newReport = new reports({
            ownedId: req.body.userId,
            report: newfile.id,
            message: req.body.message,
            date: Date.now()
        });
        await newReport.save();
        return res.send({ msg: 'post saved' });
    } catch (err) {
        res.status(400).send({ error: err});
        console.log(err);
    }
});

router.post('/upload', upload.single('file'),adduserid, doctorauth, async (req, res) => {
    try {
        if (!req.file) {
            throw "No file was uploaded";
        }
        const report = req.file.buffer.toString('base64');
        console.log(report);
        const ownedId = req.body.userId;
        let newpdf = new pdf({
            data: report
        })
        await newpdf.save();
        let newReport = new reports({
            ownedId,
            report: newpdf.id,
            message: req.body.message,
            date: Date.now()
        });
        await newReport.save();

        res.send({ "msg": "saved the report" })

    } catch (err) {
        res.status(400).send({ error: err })
    }
})
//route to delete already existing posts
router.post('/delete', userauth, async (req, res) => {
    try {
        let post = await reports.findById(req.body.postId)
        if (post) {
            console.log(post);
            let files = await pdf.findById(post.report);
            console.log(files)
            files.delete()
            post.delete()
            return res.send({ msg: "deleted the post" })
        } else {
            throw "Post not found";
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: err });
    }

});
router.post('/file',userauth,async(req,res)=>{
   try{
      let file=await pdf.findById(req.body.fileId);
      if(file){
        res.send({data:file});
      }else{
        throw "file not found";
      }
   }catch(err){
      res.status(400).send({error:err});
   }
})
router.post('/addcomment', userauth, async (req, res) => {
    try {
        let report = await reports.findById(req.body.postId);
        report.comment.push({ user: req.body.userId, comment: req.body.comment });
        await report.save();
        res.send({ msg: "commented to this post" })
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "server error" })
    }
})

router.post('/test', async (req, res) => {
    try {
        let data = await reports.findOne({ ownedId: req.body.id });
        res.send(data);
    } catch (err) {
        res.status(400).send({ error: err })
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
module.exports = router;
