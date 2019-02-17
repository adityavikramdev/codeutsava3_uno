var mongoose=require("mongoose");
exports.module=mongoose.models("books",{
	title:{type:String},
	authorName:{type:String},
	bookCost:{type:Number},
})