// src/db/index.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB is connected successfully!!!");
    } catch (err) {
        console.error("❌ MongoDB connection failed.", err.message);
        process.exit(1);
    }
};

export default connectDB;