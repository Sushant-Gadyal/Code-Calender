import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import CalendarHeatmap from 'react-calendar-heatmap';
import "./Dashboard.css"
import { Tooltip as ReactTooltip} from 'react-tooltip'; // Adjust the import statement




function Dashboard() {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [lc_date, setlc_date] = useState([]);
  const [cf_date, setcf_date] = useState([]);
  const [combined_date, setCombined_date] = useState([]);
  const [year,setYear] = useState(2024);
  const [startdate, setStartDate] = useState(new Date('2024/01/01'));
  const [enddate, setEndDate] = useState(new Date('2024/12/31'));


  const navigate = useNavigate();

  const gettingData = async ()=>{
    try{
      let resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/getuser`,{
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
    setCombined_date(combinedArr);
    console.log("combined date :", combined_date);
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
      if(lc_date.length && cf_date.length){
        combinecounts(lc_date,cf_date);
      }
    }, [lc_date, cf_date]);

    // useEffect(() => {
    //   ReactTooltip.rebuild();
    // }, [combined_date]);

    const handleChange = (e) =>{
        setYear(e.target.value);
        setStartDate(new Date(`${e.target.value}/01/01`));
        setEndDate(new Date(`${e.target.value}/12/31`));
    }



  return (
    <div>
      <Navbar />
        <div className="top-0 z-[-2] h-screen w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] flex justify-center items-center">
          <div className="flex flex-col">
            <h4 className="text-white">Select Year</h4>
              <select value={year} onChange={handleChange}>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
             </select>
            <div className="text-white">{`You selected ${year}`}</div>
          </div>
        {combined_date.length>0 && 
        <div className="h-full w-full flex justify-center items-center text-white">
          <CalendarHeatmap
            startDate={startdate}
            endDate={enddate}
            values={combined_date}
            style = {{color:"white", width:"100%", height:"100%"}}
            showWeekdayLabels = {true}
            monthLabels ={ ["Jan", "Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"] }
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${Math.min(value.count, 5)}`;
            }}
            
          />
        </div>
        }
        </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
