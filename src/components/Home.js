import React, {useContext, useEffect} from 'react'
import Notes from './Notes'
import noteContext from '../context/notes/noteContext'

export default function Home() {
    let {addNote, handleAlert, handleToggle} = useContext(noteContext); 

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

    return (
        <div className='mt-[75px]'>
            <div className='w-[50%] mx-auto pt-[1rem]'>
                <h1 htmlFor="message" className="block mb-2 text-xl">Add Notes</h1>

                <label htmlFor="title" className="block mb-2 text-md font-medium">Title</label>
                <input type="text" id="title" className="border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder='Enter title...' autoComplete='off'/>
                
                <label htmlFor="description" className="block mb-2 text-md font-medium mt-5">Description</label>
                <input type="text" id="description" className="border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder='Enter description...' autoComplete='off'/>

                <button className='rounded-md text-2xl mt-5 focus:outline-none mr-5' onClick={passNote}><i className="ri-add-circle-fill"></i></button>
            </div>
            <Notes/>
        </div>
    )
}
