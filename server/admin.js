const moongoose=require('mongoose')

const adminSchema=new moongoose.Schema({
  name:String,
  email:String,
  password:String,
})
 
module.exports=moongoose.model('admins',adminSchema,'admins')