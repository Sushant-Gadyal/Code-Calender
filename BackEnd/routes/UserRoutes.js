const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");
const userouter = express();


// Middleware to parse JSON bodies
userouter.use(express.json());


userouter.post("/register", async function(req,res){
    const saltRounds = 10;

    const plaintextpassword = req.body.password;
    
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashed  = await bcrypt.hash(plaintextpassword, salt);
       
        const newuser =  await UserModel.create({
            username : req.body.username,
            email : req.body.email,
            password : hashed,
            lc_handle : req.body.lc_handle,
            cf_handle : req.body.cf_handle,
        })

        return res.status(200).json({success:"true",message : "register done", email : req.body.email});
    }
    catch{
       return  res.status(400).json({success:"false",error : error.message});
    }
})


userouter.post("/login", async function(req,res){
    try{
        const existuser = await UserModel.findOne({email: req.body.email});

        if(!existuser){
            return res.status(400).json({success :"false" ,message: "user does not exist with this email"})
        }
        const isMatch = await bcrypt.compare(req.body.password,existuser.password);

        if(!isMatch){
            return res.status(400).json({success:"false",message : "Wrong Password"});
        }

        return res.status(200).json({success:"true",message:"logined successfully", email : req.body.email});
    }
    catch(err){
        return res.status(500).json({success : "false",message :err})
    }
})


userouter.post("/getuser",async function(req,res){
    try{
        const existuser = await UserModel.findOne({email:req.body.email});

        if(!existuser){
            return res.status(400).json({success :"false" ,message: "user does not exist with this email"});
        }
        
        let cf_resp = await fetch(`https://codeforces.com/api/user.status?handle=${existuser.cf_handle}&from=1&count=10000`);
        cf_resp = await cf_resp.json();
        // console.log(resp);

        if(last_cf_updated.date===""){
            cf_resp.result.forEach((data)=>{
                const actual_date = new Date(data.creationTimeSeconds*1000)
                                    .toISOString()
                                    .replace("-", "/")
                                    .replace("-", "/")
                                    .split("T")[0];
                
                
            })
        }   




        return res.status(200).json({success:"true"});
    }
    catch(err){

    }
})

module.exports = userouter;