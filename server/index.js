import express from 'express';
const app = express();


import connectDB from './src/db/index.js';
import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});
connectDB();
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running at:`, PORT)
})