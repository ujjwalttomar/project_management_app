import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        required :true,
        unique : true,
        trim :true,
    },
    email : {
        type : String,
        required :true,
        unique : true,
        lowercase :true,
    },
    role :{
        type : String,
        enum : ["admin" , "user","teamLeader"],
        default : "user",
    },
    password : {
        type : String,
        required : true,

    },
    fullname : {
        type : String,
        required : true,

    },
    avatar : {
        type : {
            url : String,
            localPath : String,
        },
        default : {
            url :"https://via.placeholder.com/200x200.png",
            localPath : "",
        },
    },
    isEmailVerified : {
        type : Boolean,
        default : false,
    }
},
{timestamps : true });

export const User = mongoose.model("User" , userSchema);