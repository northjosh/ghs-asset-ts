// imports
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'


let port: number = 3000


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))





app.listen(port, () =>{
    console.log(`App running on port ${port}`);
    
})
