import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Modal() {
    let {editNote, state, prev, setPrev, handleState, handleAlert, handleToggle} = useContext(noteContext); 

    const passEditedNote = async ()=>{
        let newTitle = document.querySelector("#etitle");
        let newDescription = document.querySelector("#edescription");
        let newNote = {
            title: newTitle.value, 
            description: newDescription.value
        }
        const response = await editNote(newNote); 
        console.log(response)
        if(response){
            handleState(); 
            handleAlert("green", "Note Edited");
            handleToggle(); 
        }
        
    }

    const handleChange = (e)=>{
        setPrev({...prev, [e.target.name]:e.target.value})
    }

    return (
        <div id="static-modal" data-modal-backdrop="static" className={`${state ? "flex" : "hidden"} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[100%] max-h-full`} >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h1 className="block mb-2 text-xl">Edit Notes</h1>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"  onClick={handleState}>
                        <svg className="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                    <label htmlFor="etitle" className="block mb-2 text-md font-medium">Title</label>
                    <input type="text" id="etitle" className="border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder='Enter title...' value={prev.title} name='title'  onChange={handleChange}/>
                    
                    <label htmlFor="edescription" className="block mb-2 text-md font-medium mt-5">Description</label>
                    <input type="text" id="edescription" className="border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder='Enter description...' autoComplete='off'name='description' value={prev.description}  onChange={ handleChange } />
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={passEditedNote}>Done</button>
                </div>
            </div>
        </div>
    </div>
    )
}
