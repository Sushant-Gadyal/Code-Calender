const express = require("express");
const connectDb  = require("./config/db");
const userouter = require("./routes/UserRoutes");
const bodyParser = require("body-parser");
const app = express();

const port = 3005;

// middlwares
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