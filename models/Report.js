const mongoose=require('mongoose')
let report=new mongoose.Schema({
       ownedId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
       },
       date:{
          type:String,
          required:true
       },
       message:{
         type:String,
         require:true
       },
       report:{
          type:mongoose.Schema.Types.ObjectId,
       },
       comment:{
         type:Array,
       }
})
module.exports=mongoose.model('report',report);