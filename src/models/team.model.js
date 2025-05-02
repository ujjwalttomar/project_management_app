// src/models/team.models.js

import mongoose from "mongoose";

const teamSchema = mongoose.Schema({

    name : {
        type : String,
        required : true, 
        unique : true,

    },
    description : {
      type : string,
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