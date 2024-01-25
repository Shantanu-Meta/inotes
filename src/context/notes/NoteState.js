import { useState } from "react"
import noteContext from "./noteContext"

export default function NoteState(props) {
      const [notes, setNotes] = useState([]); 
      const host = "http://localhost:5000"
      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhODAxYzM1ZjU4YTViZWQyZGVlNzkwIn0sImlhdCI6MTcwNTczMjQ4M30.v131LBR6TJUn80McczI-V4hweH7LuP4SbjftcVIbwts"

      // any type api calls(GET, POST, PUT, DEL) can be made from this func.
      const apiCall =async (url, method, authToken, noteObj)=>{
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify(noteObj), 
        });
        const json = await response.json();
        return json;
      }

      // Fetch notes from DB and display by updating [notes] state => DONE
      const fetchNotes = async ()=>{
        // Fetch from mongoDb via fetchNote api.
        const url = `${host}/api/note/getnote`
        const allNotes = await apiCall(url,"GET",authToken); 
        setNotes(allNotes); 
      }

      // Add note to DB and display by updating [notes] state. => DONE
      const addNote = async(newNote)=>{
        // Add to mongoDb via addNOte api.
        const url = `${host}/api/note/addnote`
        const newlyAddedNote = await apiCall(url, "POST", authToken, newNote); 
        setNotes(notes.concat(newlyAddedNote))
      }

      // Delete note from DB and display by updating [notes] state. => DONE
      const deleteNote = async (noteId)=>{
        // Delete from mongoDb via deleteNote api.
        const url = `${host}/api/note/deletenote/${noteId}`
        await apiCall(url, "DELETE", authToken); 

        const newNotes = notes.filter((note)=>{
          return (note._id!==noteId)
        })
        setNotes(newNotes); 
      }

      // Edit note in DB and display by updating [notes] state.
      const editNote = (noteId)=>{
        // edit in mongoDb via editNote api.

        
        // setNotes(newNotes); 
      }


    return (
        <>
            <noteContext.Provider value={{notes,setNotes,fetchNotes, addNote, deleteNote, editNote}}>
                {props.children}
            </noteContext.Provider>
        </>
    )
}
