// Initialising the dependencies
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config();
require("./util/dbconnect")
const app =express();
// implementing middle wares like cors to integrate, express static to use upload file from frontend to backend
const PORT=process.env.PORT
app.use(express.json());
app.use(cors())
app.use('/uploads',express.static('uploads'))
// getting the routes of user and tweet 
const user = require("./Routes/user.route")
const tweet = require("./Routes/tweet.route")
app.use("/api/v1",user)
app.use("/api/v1",tweet)
app.listen(5000,()=>{
    console.log(`Server is running on Port ${PORT}`);
})