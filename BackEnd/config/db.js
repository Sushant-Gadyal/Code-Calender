const mongoose = require("mongoose");

mongoose.set("strictQuery", true, "useNewUrlParser", true);


const connectDb = async ()=>{

    try{
        await mongoose.connect("mongodb://localhost:27017/CodeCalender");
        console.log("DB connected");
    }  
    catch(err){
        console.log("Error while connecting DB ", err);
    }
}

module.exports = connectDb;

