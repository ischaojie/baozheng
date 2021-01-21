import React from "react"
import {Link, BrowserRouter as Router} from "react-router-dom"
import logo from "../logo.svg"

function Header() {
    return (
        <nav className="bg-white py-2 md:py-4">
            <div className="container px-4 mx-auto md:flex md:items-center">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex flex-row font-bold text-xl text-indigo-600">
                        <span className="sr-only">BAOZHENG</span>
                        <img className="h-8 w-auto sm:h-10"
                             src={logo} alt=""/>
                        <div className="pt-1 px-2">BAOZHENG</div>
                    </Link>
                    <button
                        className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
                        id="navbar-toggle">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
                     id="navbar-collapse">

                    <Link to="/dataset"
                          className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        Home</Link>
                    <Link to="/dataset"
                          className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        数据集</Link>
                    <Link to="/mark"
                          className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        标注</Link>
                    <Link to="/about"
                          className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        关于</Link>
                    <Link to="/login"
                          className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">
                        Login</Link>
                    <Link to="#"
                          className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                        Signup</Link>

                </div>
            </div>
        </nav>
    );
}


export default Header