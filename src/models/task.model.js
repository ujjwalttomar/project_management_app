//  src/models/task.models.js


import mongoose from  "mongoose";

const taskSchema = mongoose.Schema({

    title : {
        type : String,
        required : true,
        
        
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
      
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    status : {
        type : String,
        enum : ["active" , "completed" ,"archived"],
        default : "active",
    },
    deadline : {
        type : Date,
    },
    priority : {
        type : String,
        enum : ["low" , "medium", "high"],
        default : "low",
    },
    description : {
        type : String,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
      
},
{ timestamps: true });

export default mongoose.model("Task" , taskSchema);