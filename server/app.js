import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/authRoutes.js'
import adminRouter from './routes/adminRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true // Required to allow cookies to travel back and forth
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser()); // Parses incoming cookies into req.cookies

app.use("/api/user",userRoutes)
app.use('/api/admin',adminRoutes)

export default app
