import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected!');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection Error,'+err);
            process.exit(1);
        })


    }
    catch (error) {
        console.log("Error in connecting to Database!");
        console.log(error);
        process.exit(1);
    }
}