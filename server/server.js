// server.js
import app from './app.js'; 
import connectDB from './config/db.js'; //  Correct ES Module syntax
import dotenv from 'dotenv';

// Load environment variables
 dotenv.config();

// Connect to the Database
connectDB();

const PORT = process.env.PORT ||console.log('server side port is missing');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});