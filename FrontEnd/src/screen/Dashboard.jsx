import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";




function Dashboard() {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [lc_date, setlc_date] = useState([]);
  const [cf_date, setcf_date] = useState([]);
  const [combined_date, setCombined_date] = useState([]);


  const navigate = useNavigate();

  const gettingData = async ()=>{
    try{
      let resp = await fetch("http://localhost:3005/api/user/getuser",{
          method:"POST",
          headers : {
            "Content-Type": "application/json"
          },
          body : JSON.stringify({email:localStorage.getItem("useremail")}),
      }) 
      const data = await resp.json();
      if(data.success ==="true"){
        setlc_date(data.lc_submission_date);
        setcf_date(data.cf_submission_date);
      }
      // console.log(data.lc_submission_date);
      // console.log(data.cf_submission_date);
      // console.log(lc_date);
      // console.log(cf_date);
    }catch(err){
      console.log("Error : ", err );
    }
  }

  const combinecounts = (arr1, arr2)=>{
    const dateCountMap = {}   // creation of maps to get single date with combined counts

    arr1.forEach((item)=>{
      const date = item.date;
      const cnt = item.count;

      if(dateCountMap[date]){
        dateCountMap[date] += cnt;
      }
      else{
        dateCountMap[date] = cnt;
      }
    })

    arr2.forEach((item)=>{
      const date = item.date;
      const cnt = item.count;

      if(dateCountMap[date]){
        dateCountMap[date]+=cnt;
      }
      else{
        dateCountMap[date] = cnt;
      }
    })

    const combinedArr = Object.keys(dateCountMap).map((key)=>{
      return {date : key, count: dateCountMap[key]};
    })

    console.log(combinedArr);
  }

  useEffect(() => {
    if (localStorage.getItem("useremail")) {
      setisLoggedin(true);
      // console.log(localStorage.getItem("useremail"));
      gettingData();
    }
    else {
      navigate("/");
    }
  }, []);

    // Log the state after it has been updated
    useEffect(() => {
      console.log("lc_date updated: ", lc_date);
      console.log("cf_date updated: ", cf_date);
      combinecounts(lc_date,cf_date);
    }, [lc_date, cf_date]);



  return (
    <div>
      <Navbar />
        <div className="top-0 z-[-2] h-screen w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        I am in Dashboard
        </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
