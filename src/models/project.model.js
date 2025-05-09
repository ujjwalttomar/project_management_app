 // src/models/project.models.js
 
 
 import mongoose from "mongoose";

 const projectSchema = mongoose.Schema ({

    projectName : {
        type : String,
        required : true,
        unique : true,

    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    team : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Team",
    },
    description : {
        type : String,
        required : true,

    },
    deadLine : {
        type : Date,
        required : true,
    },
    status : {
        type : String,
        enum : ["active", "completed", "archived"],
        default : "active",
    },
    
 },
{timestamps : true});

export default mongoose.model ("Project" , projectSchema);
