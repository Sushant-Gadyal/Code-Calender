import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {

    const [userData , setuserData] = useState({
        username : "",
        email:"",
        password:"",
        lc_handle:"",
        cf_handle:""
    });

    const handleChange = (e)=>{
        e.preventDefault();
        setuserData({...userData,[e.target.name]:e.target.value});
        console.log(userData);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3005/api/user/register",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body : JSON.stringify(userData)
        })
        const data = await response.json();
        console.log(userData);
        console.log(data);
    }


  return (
    <div className="top-0 z-[-2] h-screen w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="/logo.png"
            alt="logo"
          />
          Code Calender
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Your Username
                    </label>
                    <input
                    type="text"
                    name="username"
                    id="uername"
                    value={userData.username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="XYZ"
                    onChange={handleChange}
                    required=""
                    />
                </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value = {userData.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={handleChange}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value = {userData.password}
                  placeholder="*****"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required=""
                />
              </div>

              <div>
                    <label
                    htmlFor="lc_handle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Your Leetcode Handle Name
                    </label>
                    <input
                    type="text"
                    name="lc_handle"
                    id="lc_handle"
                    value = {userData.lc_handle}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Stuc"
                    onChange={handleChange}
                    required=""
                    />
                </div>

                <div>
                    <label
                    htmlFor="cf_handle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Your Codeforces Handle Name
                    </label>
                    <input
                    type="text"
                    name="cf_handle"
                    id="cf_handle"
                    value = {userData.cf_handle}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="pqr"
                    onChange={handleChange}
                    required=""
                    />
                </div>

                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
