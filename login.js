const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
         type:String,
         required:true
    },
    rollno:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    num:{
        type:Number,
        required:true
    },

})

const userModel = mongoose.model("User",userSchema);
module.exports = userModel;