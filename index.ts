// imports
import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { authenticateToken } from './middlewares/authToken.middleware';
import { logActivity } from './middlewares/logActivity.middleware';

config();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,

}




let port: number = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(authenticateToken);
app.use(logActivity);





app.listen(port, () =>{
    console.log(`App running on port ${port}`);
    
})
