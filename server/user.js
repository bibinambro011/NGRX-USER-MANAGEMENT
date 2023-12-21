const moongoose=require('mongoose')

const userSchema=new moongoose.Schema({
  name:String,
  email:String,
  password:String,
  profile:{
    type:String,
    default:''
  }
})
 
module.exports=moongoose.model('user',userSchema,'user')