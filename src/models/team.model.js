import mongoose from "mongoose";

const teamSchema = mongoose.Schema({

    teamName : {
        type : String,
        required : true, 
        unique : true,

    },
    
    members : [
       {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        role : {
            type : String,
            enum : ["user" , "admin","teamLeader"],
            default : "user",
        },
        joinedAt : {
            type : Date,
            required : true,
            default : Date.now,
        },
        }

    ],
    
    createdBy : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
},
{ timestamps: true });

export default mongoose.model("Team", teamSchema);