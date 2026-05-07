import express from 'express'
import { dbConnect } from './config/db.js';
import router from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';


const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());


// DB 
dbConnect();

//routes..
app.use("/api/v1" , router)

const port = 5000;
app.listen(port , () => {
    console.log(`server is running on port ${port}`)
})