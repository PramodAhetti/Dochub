const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},email:{
    type:String,
    required:true ,
    unique:true 
},doctor:{
    type:Boolean,
    require:true
}
,password:{
    type:String,
    required:true
},avatar:{
    type:String
}
});
module.exports=User=mongoose.model('user',UserSchema);