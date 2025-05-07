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

userSchema.pre("save",async function (next) {
  if(!this.isModified(password)){
    return next();
  }
  const salt = awaiy bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePasswords= async function (enterPassword){
  return await bcryot.compare(enterPassword, this.password);
};

export const User = mongoose.model("User" , userSchema);
