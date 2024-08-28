import express from 'express';
import cors from 'cors';
import userRouter from './routes/User/userRoute'
import { ConnectDb } from './database/db';
// import bodyParser from 'body-parser';

const app = express();
ConnectDb();

// Configure CORS options
const corsOptions = {
    origin: 'https://jobmifi-backend.onrender.com', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
  };
  
 // cors
  app.use(cors(corsOptions));

// Initialize dotenv configuration
require('dotenv').config()

app.use(express.json({ limit: '50mb'})); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '50mb' })); 

//middleware route
app.use('/api/users', userRouter);
// app.use('/api/users', userRouter);

const PORT = process.env.PORT;

// Server configuration
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});