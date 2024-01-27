import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Alert() {
  const {alert, active} = useContext(noteContext); 

  return (
    <div className={`alert p-4 text-sm rounded-lg text-white bg-${alert.bgCol}-400 absolute ${active ? "top-0" : "top-[-100%]"} left-[50%] translate-x-[-50%] z-10`} role="alert">
        <span className="font-medium">{alert.msg}</span>
    </div>
  )
}
