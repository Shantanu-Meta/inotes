import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import { useSelector } from 'react-redux';

export default function Noteitem(props) {
  let {deleteNote, handleState, setPrev, handleAlert, handleToggle} = useContext(noteContext); 
  const {_id, title, description, tag, date} = props.note;
  const handleDeleteNote = ()=>{
    deleteNote(_id); 
    handleAlert("red", "Note Deleted")
    handleToggle(); 
  }
  const handleEditNote = ()=>{
    setPrev(props.note);
    handleState(); 
  }
  const {cardsBg} = useSelector(state => state.theme)
  return (
    <div className='card max-w-sm rounded-lg shadow-2 shadow-2xl relative p-2' style={{backgroundColor: cardsBg}}>
        <h1 className='title mb-2 text-xl font-bold tracking-tight'>{title}</h1>
        <p className='desc mb-2 font-normal overflow-hidden text-gray-400'>{description}</p>
        <div className='w-full flex align-center justify-between'>
            <span>{date}</span>
            <span>{tag}</span>
        </div>
        <div className='w-full flex align-center justify-between mt-3'>
            <span onClick={handleDeleteNote}><i className="ri-delete-bin-line text-xl"></i></span>
            <span onClick={handleEditNote}><i className="ri-pencil-line text-xl"></i></span>
        </div>
    </div>
  )
}
