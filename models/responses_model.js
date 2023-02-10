const mongoose=require('mongoose');
var ObjectId = require('mongodb').ObjectId;
const responsesSchema =mongoose.Schema({
    survey_id:{
        type:ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    survey:{
        type:Array,
        required:false
    }
    
},{timestamps:true});

mongoose.set('strictQuery', false);
module.exports=mongoose.model('responses',responsesSchema);