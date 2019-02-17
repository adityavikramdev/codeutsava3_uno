var mongoose=require("mongoose");
module.exports=mongoose.model("works",{
	projectId:{type:mongoose.Schema.Types.ObjectId},
	startupId:{type:mongoose.Schema.Types.ObjectId},
	mentorId:{type:mongoose.Schema.Types.ObjectId},
	status:{type:String},
	date:{type:Date,default:Date.now()}
})