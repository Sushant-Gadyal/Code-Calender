const mongoose = require("mongoose");

mongoose.set("strictQuery", true, "useNewUrlParser", true);


const connectDb = async ()=>{

    try{
        await mongoose.connect("mongodb+srv://sushantgadyal19:plati19@clusterforpersonal.jqowjo0.mongodb.net/CodeCalender?retryWrites=true&w=majority&appName=ClusterforPersonal");
        console.log("DB connected");
    }  
    catch(err){
        console.log("Error while connecting DB ", err);
    }
}

module.exports = connectDb;

