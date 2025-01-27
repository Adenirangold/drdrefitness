import mongoose from "mongoose";
import {config} from "@/lib/config";

const connectToDatabase = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        await mongoose.connect(config.databaseUrl);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed');
    }
};

export default connectToDatabase;