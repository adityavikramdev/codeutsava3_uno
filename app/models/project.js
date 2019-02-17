var mongoose=require("mongoose");
module.exports=mongoose.model("projects",{
	title:{type:String},
	domain:{type:String},
	status:{type:String,default:"inactive"},
	mentorid:{type:mongoose.Schema.Types.ObjectId,default:null},
	description:{type:String},
	startupid:{type:mongoose.Schema.Types.ObjectId},
	date:{type:Date,default:Date.now()},
	time:{type:String}

})