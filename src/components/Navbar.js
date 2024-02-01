import React, {useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext"
import { useDispatch, useSelector } from 'react-redux';
import toggleTheme from '../action-creters/theme-actions';

export default function Navbar() {
    let linkLoc = useLocation(); 
    const {setNotes, data} = useContext(noteContext);
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem("auth-token"); 
        setNotes([]);
        navigate("/login"); 
    }
    
    const dispatch = useDispatch();
    const {text,bg,buttons,navbar, isDark}  = useSelector(state => state.theme)
    return (
        <div className="fixed top-0 left-0 w-full z-0" style={{backgroundColor:navbar, color:text}}>
          <nav className="border-gray-200">
            <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" style={linkLoc.pathname==='/' ? {color:"blue"} : {color:"black"}}>
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                    <span className="relative self-center text-2xl font-semibold whitespace-nowrap">iNotes
                    <span className='absolute bottom-[-50%] left-0 text-sm ml-0'>By-Shantanu</span></span>
                </Link>

                <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"  data-accordion-target="#navbar-default" aria-expanded="true" aria-controls="navbar-default">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="flex items-center justify-between w-full  md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li style={linkLoc.pathname==='/' ? {color:"blue"} : {color:"black"}}>
                        <Link to="/" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" >Home</Link>
                        </li>
                        <li style={linkLoc.pathname==='/about' ? {color:"blue"} : {color:"black"}}>
                        <Link to="/about" className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700" >About</Link>
                        </li>
                    </ul>
                    <div className=' ml-[1.5rem]  text-xl cursor-pointer' onClick={()=>{isDark ? dispatch(toggleTheme("LIGHT")) : dispatch(toggleTheme("DARK"))}}>
                    {isDark ? <i class="ri-sun-line"></i> : <i className="ri-moon-fill"></i>}
                    </div>
                    {!localStorage.getItem('auth-token') && <div className='flex items-center justify-evenly ml-[1.5rem] gap-2'>
                        <Link to="/signup"><button type="button" className="p-2 bg-blue-700 justify-center text-sm text-white rounded-lg" style={{backgroundColor:buttons}}>Sign up</button></Link>
                        <Link to="/login"><button type="button" className="p-2 bg-blue-700 text-white justify-center text-sm rounded-lg" style={{backgroundColor:buttons}}>Log in</button></Link>
                    </div>}
                    {localStorage.getItem('auth-token') && <div className='flex items-center justify-evenly ml-[1.5rem] gap-2'>
                        <div className='profile flex flex-col items-center rounded-full'>
                           <div className={`hover:text-white profile-logo  py-2 px-3 cursor-pointer rounded-full border-2 border-[${buttons}] hover:bg-[${buttons}] hover:border-blue-700`}><i className="ri-user-line"></i></div>
                           <div className={`details absolute top-[102%] bg-[${buttons}] p-2 rounded scale-y-0`}>
                            <ul className='flex flex-col items-center gap-2  font-bold'>
                                <li className='text-white hover:bg-[#ffffff30] rounded'>{data._id}</li>
                                <li className='text-white hover:bg-[#ffffff30] rounded'>{data.name}</li>
                                <li className='text-white hover:bg-[#ffffff30] rounded'>{data.email}</li>
                            </ul>
                           </div>
                        </div>

                        <button type="button" className="p-2 text-white justify-center text-sm  rounded-lg" onClick={logOut} style={{backgroundColor:buttons}}>Log out</button>
                    </div>}
                </div>
            </div> 
          </nav>
        </div>
      )
}

