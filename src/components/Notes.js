import React, { useContext, useEffect } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';

// Component: Display all notes from dataBase
export default function Notes() {
    let allNotes = useContext(noteContext); 
    let {notes, fetchNotes} = allNotes; 
    let navigate = useNavigate(); 
    useEffect(async () => {
        let resp = 0; 
        if(localStorage.getItem("auth-token")){
            resp = await fetchNotes(); 
        }
        if(!resp) navigate("login")
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='w-[80%] mx-auto pt-[1rem]'>
            <h1 htmlFor="message" className="block mb-2 text-xl">Your Notes</h1>
            <div className='flex align-center justify-start flex-wrap gap-1'>
                {notes.length ? notes.map((note) => {
                    return <Noteitem note={note} key={note._id}/>
                }) : <h1 className='text-gray-400 mt-2'>No notes are there :(</h1>}
            </div>
        </div>
    )
}
