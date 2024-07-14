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
        // console.log(cf_resp);
        
        if(existuser.last_cf_updated.date===""){               // cf_submission -> today, yester, day bef yest 
            cf_resp.result.forEach(async (data)=>{
                if(data.verdict==="OK"){
                    const actual_date = new Date(data.creationTimeSeconds*1000)
                    .toISOString()
                    .replace("-", "/")
                    .replace("-", "/")
                    .split("T")[0];
                    
                    if(existuser.cf_submission_date.length===0){
                        existuser.cf_submission_date.push({date:actual_date,count:1});
                    }
                    else{
                        let len_of_sub = existuser.cf_submission_date.length;
                        if(existuser.cf_submission_date[len_of_sub-1].date===actual_date){
                            existuser.cf_submission_date[len_of_sub - 1].count += 1;
                        }
                        else{
                            existuser.cf_submission_date.push({date:actual_date,count:1});
                        }
                    }

                }
            })
            existuser.last_cf_updated.date = existuser.cf_submission_date[0].date;
            existuser.last_cf_updated.count = existuser.cf_submission_date[0].count;
            console.log(existuser.cf_submission_date);
            await existuser.save();
        }
        else{
            // this is the optimized part , when already some data has been updated i no need to get the cf_dates which are already present , instead put which are not present.
            let new_date_arr=[];
            let flag = new Boolean(false);  // this is for tracking the submissions on some day , if last updated was 2024/05/21 and count is 5 , may be someone did 2 more count on same day so i need to update that
            for(let i=0 ; i<cf_resp.result.length ; i++){
                if(cf_resp.result[i].verdict==="OK"){
                    var last_date = existuser.last_cf_updated.date  // this is the date where the last time or most recent submission

                    var current_date = new Date(cf_resp.result[i].creationTimeSeconds*1000)   // this gives new date which may be more recent one than before or may be equal but not lesser than that
                    .toISOString()
                    .replace("-", "/")
                    .replace("-", "/")
                    .split("T")[0];
 
                    if(current_date > last_date){
                        if(new_date_arr.length===0){
                            new_date_arr.push({date:current_date,count:1});
                        }
                        else{
                            let len = new_date_arr.length;
                            if(new_date_arr[len-1].date===current_date){
                                new_date_arr[len-1].count+=1;
                            }
                            else{
                                new_date_arr.push({date:current_date,count:1});
                            }
                        }
                    }
                    else if(current_date===last_date){
                        flag = true;
                        if(new_date_arr.length===0){
                            new_date_arr.push({date:current_date,count:1});
                        }
                        else{
                            let len = new_date_arr.length;
                            if(new_date_arr[len-1].date===current_date){
                                new_date_arr[len-1].count+=1;
                            }
                            else{
                                new_date_arr.push({date:current_date,count:1});
                            }
                        }
                    }
                    else break;
                }  
            }

            if(flag===false){
                for(let i=new_date_arr.length-1 ; i>=0 ; i--){
                    existuser.cf_submission_date.unshift(new_date_arr[i]);   // cf_submission -> today, yester, day bef yest . so here as these dates are most recent one i need to push them front-> so use of unshift
                }
            }
            else{
                const len = new_date_arr.length;
                existuser.cf_submission_date[0] = new_date_arr[len-1];
                for(let i=new_date_arr.length-2 ; i>=0; i--){
                    existuser.cf_submission_date.unshift(new_date_arr[i]);
                }
            }
            existuser.last_cf_updated.date = existuser.cf_submission_date[0].date;
            existuser.last_cf_updated.count = existuser.cf_submission_date[0].count;


            await existuser.save();
            
        }

        let lc_resp = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${existuser.lc_handle}`);   // lc_resp has only data and all counts of that respective data but not like cf
        lc_resp = await lc_resp.json();

        if(existuser.last_lc_updated.date===""){   // first time it is retreving the data

            for(let key in lc_resp.submissionCalendar){
                let current_cnt = lc_resp.submissionCalendar[key];
                let dup_key = parseInt(key);
                let current_date = new Date(dup_key*1000)   
                .toISOString()
                .replace("-", "/")
                .replace("-", "/")
                .split("T")[0];

                existuser.lc_submission_date.unshift({date : current_date, count : current_cnt});   // here todays data comes first then next yesterdays, day before yesterday and so on.
            }
            existuser.last_lc_updated.date = existuser.lc_submission_date[0].date;
            existuser.last_lc_updated.count = existuser.lc_submission_date[0].count;

            await existuser.save();
        }
        else{
            // console.log("got");
            let new_date_arr = [];    // this always has to get today, yest, day before yest like that
            for(let key in lc_resp.submissionCalendar){
                let current_cnt = lc_resp.submissionCalendar[key];
                let dup_key = parseInt(key);
                let current_date = new Date(dup_key*1000)   
                .toISOString()
                .replace("-", "/")
                .replace("-", "/")
                .split("T")[0];

                // console.log(typeof current_date);

                if(current_date === existuser.last_lc_updated.date){
                    new_date_arr.unshift({date:current_date, count:current_cnt});
                    // console.log(current_date);
                }
                else if(current_date > existuser.last_lc_updated.date){
                    new_date_arr.unshift({date:current_date, count:current_cnt});
                    // console.log(current_date);
                }
                else{
                    // console.log(current_date);
                }
               
            }

            // for(let i=0 ; i<new_date_arr.length;  i++){
            //     console.log(new_date_arr[i]);
            // }

            let new_arr_len = new_date_arr.length;
            if(new_arr_len>0){
                existuser.lc_submission_date[0] = new_date_arr[new_arr_len-1];
                for(let i=new_arr_len-2 ; i>=0 ; i--){
                    existuser.lc_submission_date.unshift(new_date_arr[i]);
                }
                existuser.last_lc_updated.date = existuser.lc_submission_date[0].date;
                existuser.last_lc_updated.count = existuser.lc_submission_date[0].count;
                await existuser.save();
            }
            
        }


        console.log("got called");

        return res.status(200).json({success:"true", lc_submission_date:existuser.lc_submission_date, cf_submission_date : existuser.cf_submission_date});
    }
    catch(err){
        return res.status(400).json({success:"false",message:err});
    }
})

module.exports = userouter;