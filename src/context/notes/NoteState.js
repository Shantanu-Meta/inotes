import { useState } from "react"
import noteContext from "./noteContext"

export default function NoteState(props) {
      const [notes, setNotes] = useState([])  // To hold all notes fetched from DB. 
      const [state, setState] = useState(false) // to hold the edit model state. [display / not display]
      const [alert, setAlert] = useState({bgCol:'', msg:''}); 
      const [active, setActive] = useState(0)
      const [prev, setPrev] = useState({
        _id: '', 
        title: '',
        description: '', 
        tag:'', 
        date:''
      });  // to give access the data of NewsItem to Modal component. 
      const host = "http://localhost:5000" // hosting purpose
      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhODAxYzM1ZjU4YTViZWQyZGVlNzkwIn0sImlhdCI6MTcwNTczMjQ4M30.v131LBR6TJUn80McczI-V4hweH7LuP4SbjftcVIbwts"

      // Alert Handling fnc. 
      const handleAlert = (bgCol, msg)=>{
        let newAlert = {bgCol, msg}; 
        setAlert(newAlert);
      }

      const handleToggle = ()=>{
        setActive(!active)
        setTimeout(()=>{
          setActive(active);
        }, 3000)
      }

      const handleState = ()=>{ // it handles the state of modal of EDIT. 
        setState(!state); 
      }

      // any type api calls(GET, POST, PUT, DEL) can be made from this func. =>DONE
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

      // Fetch notes from DB and display by updating [notes] state => DONE DONE
      const fetchNotes = async ()=>{
        // Fetch from mongoDb via fetchNote api.
        const url = `${host}/api/note/getnote`
        const allNotes = await apiCall(url,"GET",authToken); 
        setNotes(allNotes); 
      }

      // Add note to DB and display by updating [notes] state. => DONE DONE
      const addNote = async (newNote)=>{
        // Add to mongoDb via addNOte api.
        const url = `${host}/api/note/addnote`
        const newlyAddedNote = await apiCall(url, "POST", authToken, newNote); 
        if(!("errors" in newlyAddedNote))
          setNotes(notes.concat(newlyAddedNote))
        else 
          handleAlert("red", "Not a valid Input")
          handleToggle();
      }

      // Delete note from DB and display by updating [notes] state. => DONE DONE
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
      const editNote = async (newNote)=>{
        const noteId = prev._id; 
        // edit in mongoDb via editNote api.
        const url = `${host}/api/note/updatenote/${noteId}`
        const newlyeditedNote = await apiCall(url, "PUT", authToken, newNote); 
        
        if(!("errors" in newlyeditedNote)){
          const newNote = JSON.parse(JSON.stringify(notes))
          for (let i=0; i<newNote.length; i++) {
            if (newNote[i]._id === noteId) {
              newNote[i].title = newlyeditedNote.title; 
              newNote[i].description = newlyeditedNote.description; 
              newNote[i].tag = newlyeditedNote.tag; 
              break; 
            }
          }
          setNotes(newNote)
          return 1; 
        }else {
          handleAlert("red", "Not a valid Input")
          handleToggle();
          return 0; 
        }
      }

    return (
        <>
            <noteContext.Provider value={{notes,setNotes,fetchNotes, addNote, deleteNote, editNote, state, handleState, prev, setPrev, alert, handleAlert, active, handleToggle}}>
                {props.children}
            </noteContext.Provider>
        </>
    )
}
