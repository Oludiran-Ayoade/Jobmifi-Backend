import mongoose from "mongoose";

// Configure dotenv
require('dotenv').config()

export const ConnectDb = () => {
    const URI = process.env.MONGODB_URI as string;

    mongoose.connect(URI) 
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.error('MongoDB Connection error:', err);
    }); 
}

