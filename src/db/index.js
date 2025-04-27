import mongoose from "mongoose";
const Schema = mongoose.Schema;

const connectDB = async () =>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ MongoDB is connected successfully!!!");
    }catch(err){
        console.log("❌ MongoDB connection failed. ");
        process.exit(1);

    }
};

export default connectDB;