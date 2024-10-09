const mongoose = require('mongoose')

mongoose
  .connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@assets.rxllb.mongodb.net/?retryWrites=true&w=majority&appName=Assets`
  )
  .then((r) => console.log("Database connected successfully"));


  