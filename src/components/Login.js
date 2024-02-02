import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Login() {
    const {login} = useContext(noteContext)
    const navigate = useNavigate();
    const {text,bg,buttons,isDark}  = useSelector(state => state.theme)

  const checkUpcomingUser = async (e)=>{
    e.preventDefault(); // prevents from reload on sumbmit.
    const loginUser = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    }
    let response = await login(loginUser);
    if(response){
        console.log("login done");
        navigate('/');
    }
  }
  return (
    <section className={`w-full h-full bg-[${bg}]`}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className={`w-full rounded-lg  md:mt-0 sm:max-w-md xl:p-0 shadow-2 shadow-2xl`} style={{backgroundColor: isDark ? "#0f2a4f7d" : "white", color: text}}>
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        You need to log in!
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={checkUpcomingUser}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                            <input type="email" name="email" id="email" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="eg. name@company.com" required="true" style={{backgroundColor: isDark ? "#0f2a4f7d" : "white", color: text}}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="true" style={{backgroundColor: isDark ? "#0f2a4f7d" : "white", color: text}}/>
                        </div>
                        <button type="submit" className={`w-full text-[white] bg-[${buttons}] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Log in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link  to="/signup" className={`text-[${buttons}] font-bold`}>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
