const express = require("express");
const connectDb  = require("./config/db");
const userouter = require("./routes/UserRoutes");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();


const app = express();
const port = process.env.PORT || 3005;

// middlwares
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//db connection
connectDb();

app.use("/api/user",userouter);

app.get("/", function(res,res){
    res.send("Hello bhai api working");
})

app.listen(port,function(){
    console.log("Server is runnnign on port 3005");
})