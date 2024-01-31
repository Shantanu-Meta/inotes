import React, {useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext"

export default function Navbar() {
    let linkLoc = useLocation(); 
    const {setNotes, data} = useContext(noteContext);
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem("auth-token"); 
        setNotes([]);
        navigate("/login"); 
    }
    return (
        <div className="fixed top-0 left-0 w-full z-0">
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" style={linkLoc.pathname==='/' ? {color:"blue"} : {color:"white"}}>
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                    <span className="relative self-center text-2xl font-semibold whitespace-nowrap dark:text-white">iNotes
                    <span className='absolute bottom-[-50%] left-0 text-sm dark:text-white ml-0'>By-Shantanu</span></span>
                </Link>
                <button  type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"  data-accordion-target="#navbar-default" aria-expanded="true" aria-controls="navbar-default">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="flex items-center justify-between w-full  md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li style={linkLoc.pathname==='/' ? {color:"blue"} : {color:"white"}}>
                        <Link to="/" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" >Home</Link>
                        </li>
                        <li style={linkLoc.pathname==='/about' ? {color:"blue"} : {color:"white"}}>
                        <Link to="/about" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" >About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('auth-token') && <div className='flex items-center justify-evenly ml-[1.5rem] gap-2'>
                        <Link to="/signup"><button type="button" className="p-2 bg-blue-700 justify-center text-sm text-white rounded-lg">Sign up</button></Link>
                        <Link to="/login"><button type="button" className="p-2 bg-blue-700 justify-center text-sm text-white rounded-lg">Log in</button></Link>
                    </div>}
                    {localStorage.getItem('auth-token') && <div className='flex items-center justify-evenly ml-[1.5rem] gap-2'>
                        <div className='profile flex flex-col items-center rounded-full'>
                           <div className='profile-logo text-white py-2 px-3 cursor-pointer rounded-full border-2 border-white hover:bg-blue-700 hover:border-blue-700'><i class="ri-user-line"></i></div>
                           <div className='details absolute top-[102%] bg-[#111827] p-2 rounded scale-y-0'>
                            <ul className='flex flex-col items-center gap-2 text-white font-bold'>
                                <li className='hover:bg-[#ffffff30] rounded'>{data._id}</li>
                                <li className='hover:bg-[#ffffff30] rounded'>{data.name}</li>
                                <li className='hover:bg-[#ffffff30] rounded'>{data.email}</li>
                            </ul>
                           </div>
                        </div>

                        <button type="button" className="p-2 bg-blue-700 justify-center text-sm text-white rounded-lg" onClick={logOut}>Log out</button>
                    </div>}
                </div>
            </div>
          </nav>
        </div>
      )
}

