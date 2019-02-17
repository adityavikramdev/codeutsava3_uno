var mongoose=require("mongoose");
module.exports=mongoose.model("investors",{
	name:{type:String},
	contactNumber:{type:Number},
	email:{type:String},
	project:{type:Array}
})