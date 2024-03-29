
const mongoose=require('mongoose')
let file=new mongoose.Schema({
    data:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('file',file);