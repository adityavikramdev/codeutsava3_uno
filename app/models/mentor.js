var mongoose=require("mongoose");
module.exports=mongoose.model('mentors',{
	name:{type:String},
	email:{type:String},
	designation:{type:String},
	interestfield:{type:String},
	contactNumber:{type:Number},
	password:{type:String},
	imagepath:{type:String},
	status:{type:String,default:"inactive"},
	date:{type:Date,default:Date.now()}

})