var mongoose=require("mongoose");
module.exports=mongoose.model('startups',{
	name:{type:String},
	headName:{type:String},
	email:{type:String},
	contactNumber:{type:Number},
	dippnumber:{type:String},
	password:{type:String},
	address:{type:String},
	status:{type:String,default:'inactive'},
	date:{type:Date,default:Date.now()},
	affil:{type:String}
})