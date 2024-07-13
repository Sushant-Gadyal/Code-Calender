import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Particle from "../components/Particle";
import code from "../assets/code.gif"
import analyze from "../assets/analyze.gif"


function Home() {
  return (
    <div>
      <Navbar />
      <div className="top-0 z-[-2] h-screen w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          <div className="h-[50%]">

          </div>
          <hr className=" h-px border-0 bg-slate-800"/>
          <div className="container flex flex-row">
              <div className="flex flex-col">
                  <div>
                    <img src={code} alt="Coding" className="w-28 h-28" />
                  </div>
                  <div>
                    Think Before You Code
                  </div>
              </div>
              <div className="flex flex-col">
                  <div>
                      <img src={analyze} alt="Analyzing"className="w-28 h-28" />
                  </div>
                  <div>
                      Analyze your consistency by seeing Streak
                  </div>
              </div>
              <div className="flex flex-col">

              </div>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
