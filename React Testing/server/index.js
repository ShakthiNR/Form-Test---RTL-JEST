const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require("cors")
const PORT = 5000;


//MiddleWares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


//Routes
const userRouters = require("./Routers/users")
app.use("/api",userRouters)





app.listen(PORT,()=>{console.log(`App is running successfully in ${PORT}`)})