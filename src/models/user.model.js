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
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePasswords= async function (enterPassword){
  return await bcryot.compare(enterPassword, this.password);
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

  return resetToken;
};
export const User = mongoose.model("User" , userSchema);
