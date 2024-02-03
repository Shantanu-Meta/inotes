import React, {useContext, useState} from 'react'
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
    const [show, setShow] = useState(0); 
    const dispatch = useDispatch();
    const {text,buttons,navbar, isDark}  = useSelector(state => state.theme)
    return (
        <div className="fixed top-0 left-0 w-full z-10" style={{backgroundColor:navbar, color:text}}>
          <nav className="border-gray-200">
            <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" style={{color : isDark ? "white" : text}}>

                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                    <span className="relative self-center text-2xl font-semibold whitespace-nowrap">iNotes
                    <span className='absolute bottom-[-50%] left-0 text-sm ml-0'>By-Shantanu</span></span>
                </Link>

                <button className='md:hidden text-xl' onClick={()=>{setShow(!show)}}><i class="ri-menu-fill"></i></button>

                <div className={`flex items-center justify-between w-full  md:w-auto`} id="navbar-default z-[10]">
                    <ul className={`font-medium md:flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ${show ? "flex" : "hidden"}`}>
                        <li style={linkLoc.pathname==='/' ? {color:buttons} : {color:isDark ? "white" : "black"}}>
                        <Link to="/" className="block py-2 px-3 md:bg-transparent md:p-0 md:hover:text-blue-700">Home</Link>
                        </li>
                        <li style={linkLoc.pathname==='/about' ? {color:buttons} : {color:isDark ? "white" : "black"}}>
                        <Link to="/about" className="block py-2 px-3 md:bg-transparent md:p-0 md:hover:text-blue-700" >About</Link>
                        </li>
                    </ul>

                    <div className='ml-[1.5rem]  text-xl cursor-pointer absolute top-[17px] right-[3rem] md:static' onClick={()=>{isDark ? dispatch(toggleTheme("LIGHT")) : dispatch(toggleTheme("DARK"))}}>
                    {isDark ? <i class="ri-sun-line"></i> : <i className="ri-moon-fill"></i>}
                    </div>

                    {!localStorage.getItem('auth-token') && <div className={`md:flex flex-col md:flex-row items-center justify-evenly ml-[1.5rem] gap-2 ${show ? "flex" : "hidden"}`}>
                        <Link to="/signup"><button type="button" className="p-2 bg-blue-700 justify-center text-sm text-white rounded-lg" style={{backgroundColor:buttons}}>Sign up</button></Link>
                        <Link to="/login"><button type="button" className="p-2 bg-blue-700 text-white justify-center text-sm rounded-lg" style={{backgroundColor:buttons}}>Log in</button></Link>
                    </div>}

                    {localStorage.getItem('auth-token') && <div className='flex items-center justify-evenly ml-[1.5rem] gap-2'>
                        <div className='absolute top-[10px] right-[5rem] md:static profile flex flex-col items-center rounded-full'>
                           <div className={`hover:text-white profile-logo  py-2 px-3 cursor-pointer rounded-full border-2 border-[${buttons}] hover:bg-[${buttons}] hover:border-blue-700`}><i className="ri-user-line"></i></div>
                           <div className={`details absolute top-[102%] bg-[${buttons}] p-2 rounded scale-y-0`}>
                            <ul className='flex flex-col items-center gap-2  font-bold'>
                                <li className='text-white hover:bg-[#ffffff30] rounded'>{data._id}</li>
                                <li className='text-white hover:bg-[#ffffff30] rounded'>{data.name}</li>
                                <li className='text-white hover:bg-[#ffffff30] rounded'>{data.email}</li>
                            </ul>
                           </div>
                        </div>

                        <button type="button" className={`p-2 text-white justify-center text-sm md:md:flex rounded-lg ${show ? "flex" : "hidden"}`} onClick={logOut} style={{backgroundColor:buttons}}>Log out</button>
                    </div>}
                </div>
            </div> 
          </nav>
        </div>
      )
}

