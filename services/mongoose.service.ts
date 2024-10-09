import mongoose from "mongoose";

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5m8liet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then((r) => console.log("Database connected successfully"));