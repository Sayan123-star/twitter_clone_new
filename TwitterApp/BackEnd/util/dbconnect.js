const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("DB connected"))
.catch((error)=> console.log("Error in DB connection",error));