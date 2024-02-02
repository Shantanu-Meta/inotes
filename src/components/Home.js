import React, {useContext} from 'react'
import Notes from './Notes'
import noteContext from '../context/notes/noteContext'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let {addNote, handleAlert, handleToggle} = useContext(noteContext); 
    let navigate = useNavigate(); 
    const passNote = ()=>{
        // console.log("passNote from HOME")
        let title = document.querySelector("#title");
        let description = document.querySelector("#description");
        let newNote = {
            title: title.value, 
            description: description.value
        }
        // console.log(newNote)
        addNote(newNote); 
        title.value = ""; 
        description.value = ""; 
        handleAlert("green", "Success");
        handleToggle(); 
    }

    const {text,bg,buttons,isDark}  = useSelector(state => state.theme)

    return (
        <div className={`mt-[75px] text-[${text}] bg-[${bg}] min-h-full`}>
            <div className='w-[50%] mx-auto pt-[1rem]'>
                <h1 htmlFor="message" className="block mb-2 text-xl">Add Notes</h1>

                <label htmlFor="title" className="block mb-2 text-md font-medium">Title</label>
                <input type="text" id="title" className={`border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 shadow-2 shadow-lg focus:border-[${buttons}]`} placeholder='Enter title...' autoComplete='off' style={{backgroundColor: isDark ? "#0f2a4f7d" : "white",  color: text}}/>
                
                <label htmlFor="description" className="block mb-2 text-md font-medium mt-5">Description</label>
                <input type="text" id="description" className={`border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 shadow-2 shadow-lg focus:border-[${buttons}]`} placeholder='Enter description...' autoComplete='off' style={{backgroundColor: isDark ? "#0f2a4f7d" : "white",  color: text}}/>

                <button className='text-white rounded-md text-2xl mt-5 focus:outline-none mr-5 px-3 py-1' onClick={passNote} style={{backgroundColor: buttons}}><i class="ri-add-line"></i></button>
            </div>
            <Notes/>
        </div>
    )
    

}
