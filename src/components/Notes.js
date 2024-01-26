import React, { useContext, useEffect } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext'


// Component: Display all notes from dataBase
export default function Notes() {
    let allNotes = useContext(noteContext); 
    let {notes, fetchNotes} = allNotes; 

    useEffect(() => {
        fetchNotes(); 
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='w-[80%] mx-auto pt-[1rem]'>
            <h1 htmlFor="message" className="block mb-2 text-xl">Your Notes</h1>
            <div className='flex align-center justify-start flex-wrap gap-1'>
                {notes.map((note) => {
                    return <Noteitem note={note} key={note._id}/>
                })}
            </div>
        </div>
    )
}
