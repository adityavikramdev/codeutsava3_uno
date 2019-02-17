var mongoose=require(mongoose);
angular.exports=mongoose.models("halls",{
	name:{type:String},
	maxcapacity:{type:Number}
})