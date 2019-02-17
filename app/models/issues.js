var mongoose=require("mongoose");
angular.exports=mongoose.model("issues",{
	bookid:{type:mongoose.Schema.Types.ObjectId},
	memberid:{type:mongoose.Schema.Types.ObjectId},
	date:{type:Date,default:Date.now()}
})