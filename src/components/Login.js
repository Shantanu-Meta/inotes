import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import { Link } from 'react-router-dom';

export default function Login() {
  const {login} = useContext(noteContext)
  const navigate = useNavigate();

  const checkUpcomingUser = async (e)=>{
    e.preventDefault(); // prevents from reload on sumbmit.
    const loginUser = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    }
    let response = await login(loginUser);
    console.log(response);
    response && navigate('/')
  }
  return (
    <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        You need to log in!
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={checkUpcomingUser}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="eg. name@company.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link  to="/signup" className='text-blue-500 font-bold'>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
