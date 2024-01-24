import React, { useContext } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext'


export default function Home() {
    let allNotes = useContext(noteContext); 
    let {notes, setNotes} = allNotes; 
    return (
        <div className='mt-[75px]'>
            <div className='w-[50%] mx-auto pt-[1rem]'>
                <h1 for="message" className="block mb-2 text-xl">Add Notes</h1>
                <textarea id="message" rows="4" className="textarea resize-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 text-xl" placeholder="Add Notes here"></textarea>
                <button className='p-2 bg-gray-500 rounded-md text-white mt-5 focus:outline-none mr-5' onClick={()=>{
                    setNotes("value")
                }}>Add</button>
            </div>

            <h1 for="message" className="block mb-2 text-xl">Your Notes</h1>
            <div className='w-[50%] mx-auto pt-[1rem] flex align-center justify-evenly flex-wrap gap-1'>
                {notes.map((note) => {
                    console.log(note)
                    return <Noteitem note={note} key={note.id}/>
                })}
            </div>

        </div>
    )
}
