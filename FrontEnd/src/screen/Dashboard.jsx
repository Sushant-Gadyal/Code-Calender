import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import HeatMap from '@uiw/react-heat-map';
// import Tooltip from '@uiw/react-tooltip';



function Dashboard() {
  const [isLoggedin, setisLoggedin] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("useremail")) {
      setisLoggedin(true);

      
    } else {
      navigate("/");
    }
  }, []);



  return (
    <div>
      <Navbar />
        <div className="top-0 z-[-2] h-screen w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <HeatMap
          value={value}
          width={717}
          style = {{color:"white"}}
          weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          startDate={new Date('2016/01/01')}
        />
        </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
