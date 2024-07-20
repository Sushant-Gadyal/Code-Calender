const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

mongoose.set("strictQuery", true, "useNewUrlParser", true);


const connectDb = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }  
    catch(err){
        console.log("Error while connecting DB ", err);
    }
}

module.exports = connectDb;

