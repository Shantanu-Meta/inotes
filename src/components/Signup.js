import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import { Link } from 'react-router-dom';

export default function Signup() {
  const {signUp} = useContext(noteContext)
  const navigate = useNavigate();

  const createNewUser = async (e)=>{
    e.preventDefault(); // prevents from reload on sumbmit.
    console.log(document.querySelector('#user').value)
    const newuser = {
        name: document.querySelector('#user').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    }
    let response =await signUp(newuser);
    response && navigate('/');
  }
  return (
    <section className="mt-[1rem]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Create and account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={createNewUser}>
                        <div>
                            <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900">Your Username</label>
                            <input type="text" name="user" id="user" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="enter a username" required=""/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <span className='text-blue-800 '>terms & condition</span></label>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link  to="/login" className='text-blue-500 font-bold'>Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
