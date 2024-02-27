const express=require('express')
const app=express.Router();

app.post('/',(req,res)=>{
    try{
      res.send("this is doctor route")
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports=app;