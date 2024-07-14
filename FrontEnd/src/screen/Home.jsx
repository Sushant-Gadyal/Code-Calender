import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import code from "../assets/code.gif"
import analyze from "../assets/analyze.gif"
import time from "../assets/time.gif"
import { TypeAnimation } from "react-type-animation";


function Home() {
  return (
    <div>
      <Navbar />
      <div className="top-0 z-[-2] h-screen w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          <div className="h-[50%] flex flex-col justify-evenly items-center ">
            <div className=" flex items-center justify-center text-sky-300/75 text-7xl font-bold">
                  Track Your Coding Journey ..
            </div>
            <TypeAnimation
              sequence={[
                'Combined Heatmap for LeetCode!',
                2000, // Waits 2s
                'Combined Heatmap for Codeforces!',
                2000,
                '',
                500, // Waits 0.5s before starting the sequence again
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: '2em', color: '#C65BCF' }}
            />
          </div>
          <hr className=" h-px border-0 bg-slate-800"/>
          <div className=" flex flex-row flex-wrap justify-around h-[50%] items-center " >
              <div className="flex flex-col basis-1/3 gap-4">
                  <div className="flex justify-center ">
                    <img src={code} alt="Coding" className="w-28 h-28" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
                    <div className="text-3xl font-semibold">Improve Coding Skills</div>
                    {/* <div className="flex justify-center flex-wrap items-center h-[20%] text-center text-1xl">Get a comprehensive view of your coding practice and work on diverse problem sets.</div> */}
                  </div>
              </div>
              <div className="flex flex-col basis-1/3 gap-4">
                  <div className="flex justify-center ">
                      <img src={analyze} alt="Analyzing"className="w-28 h-28" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
                    <div className="text-3xl font-semibold">Analyze Progress</div>
                    {/* <div className="flex justify-center flex-wrap items-center h-[20%] text-center">Visually track combined performance across platforms, making it easier to identify strengths and areas for improvement.</div> */}
                  </div>
              </div>
              <div className="flex flex-col basis-1/3 gap-4">
                  <div className="flex justify-center ">
                      <img src={time} alt="Analyzing"className="w-28 h-28" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
                    <div className="text-3xl font-semibold">Efficient Time Management</div>
                    {/* <div className="flex justify-center flex-wrap items-center h-[20%] text-center">Get a comprehensive view of your coding practice and work on diverse problem sets.</div> */}
                  </div>
              </div>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
