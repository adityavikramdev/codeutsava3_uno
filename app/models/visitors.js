var mongoose=require("mongoose");
module.exports=mongoose.model("visitor",{
	name:{type:String},
	contactNumber:{type:Number},
	email:{type:String},
	pom:{type:String},
	officeNumber:{type:String}
})