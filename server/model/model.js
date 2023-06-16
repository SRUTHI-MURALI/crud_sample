const mongoose=require("mongoose")

var usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String,
    password:String
})

const User = new mongoose.model("sample",usersSchema);

module.exports=User;