import React from "react"
import {Link, NavLink} from "react-router-dom"
import logo from "../logo.svg"

function Header() {
    return (
        <nav className="bg-white py-2 md:py-4">
            <div className="container px-4 mx-auto md:flex md:items-center">
                <div className="flex justify-between items-center">
                    <Link to="/home" className="flex flex-row font-bold text-xl text-indigo-600">
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
                <Navigator/>
            </div>
        </nav>
    );
}

function Navigator() {
    const headerNav = [
        {id: 1, nav: "home", name: "Home",},
        {id: 2, nav: "datasets", name: "数据集"},
        {id: 3, nav: "mark", name: "标注"},
        {id: 3, nav: "about", name: "关于"},
    ]

    const links = [];

    for (let i = 0; i < headerNav.length; i++) {
        const temp = <NavLink to={`/${headerNav[i].nav}`} activeClassName="bg-gray-200"
                              className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300"
        >
            {headerNav[i].name}
        </NavLink>
        links.push(temp)
    }

    return (
        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 divide-x"
             id="navbar-collapse">
            <div>
                {links}
            </div>
            <div>
                <NavLink
                    to="/signin"
                    activeClassName="bg-gray-200"
                    className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300"
                >
                    登录
                </NavLink>

                <NavLink
                    to="/signup"
                    activeClassName="bg-gray-200"
                    className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 transition-colors duration-300"
                >
                    注册
                </NavLink>
            </div>

        </div>
    );
}


export default Header