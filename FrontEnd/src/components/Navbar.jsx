import React , {useState, useEffect}from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const [isDashboard, setisDashboard] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("useremail")) {
      setisDashboard(true);
    }
    console.log("aiti");
  }, []);

  return (
    <div>
      <div className="border-white dark:bg-gray-900 flex flex-wrap items-center justify-between p-3 rounded--lg">
        {/* <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 "> */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" className="h-10 w-35 ml-5" alt="Web Logo" />
          <span className="self-center mr-10 text-2xl font-semibold whitespace-nowrap dark:text-white">
            Code Calender
          </span>
        </Link>
        <div>
          {isDashboard===true ? 
            (
              <Link to="/logout">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                  Logout
                </button>
              </Link>
            )
           : 
            <>
              <Link to="/register">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                  Login
                </button>
              </Link>
            </>

          }
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
