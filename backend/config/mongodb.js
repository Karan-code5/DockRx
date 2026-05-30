import mongoose from "mongoose";

// Disable buffering so we get immediate errors instead of 10-second timeouts if DB is not connected
mongoose.set('bufferCommands', false);

const connectDB = async () => {

    try {

        mongoose.connection.on('connected', () => console.log("Database Connected"))
        mongoose.connection.on('error', (err) => console.error("MongoDB Error:", err.message))
        
        const maskedURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@') : 'UNDEFINED';
        console.log(`Connecting to: ${maskedURI}`);

        await mongoose.connect(`${process.env.MONGODB_URI}/DockRx`, {
            serverSelectionTimeoutMS: 5000,
        })

    } catch (error) {
        console.error("MongoDB Connection Error:", error.message)
    }

}

export default connectDB;
