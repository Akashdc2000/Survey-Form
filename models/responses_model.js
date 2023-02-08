const mongoose=require('mongoose');

const responsesSchema =mongoose.Schema({
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