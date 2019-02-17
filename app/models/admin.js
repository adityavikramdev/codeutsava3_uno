var mongoose=require("mongoose");
module.exports=mongoose.model("admins",{
	email:{type:String},
	password:{type:String}
})