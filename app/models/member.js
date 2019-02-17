var mongoose=require("mongoose");
angular.exports=mongoose.model("members",{
	name:{type:String},
	contactNumber:{type:Number},
	email:{type:String}
})