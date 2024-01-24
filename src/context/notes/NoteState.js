import { useState } from "react"
import noteContext from "./noteContext"

export default function NoteState(props) {
    const initialNotes = [
        {
          "_id": "65aec23e7a3e02c39bb364f3",
          "userId": "65a801c35f58a5bed2dee790",
          "title": "Need to do deep pray",
          "description": "Ajj ram lala ghar aye,nahana hay",
          "tag": "bathing",
          "date": "2024-01-22T19:28:53.147Z",
          "__v": 0
        },
        {
          "_id": "65b1695c4475f01594229fb9",
          "userId": "65a801c35f58a5bed2dee790",
          "title": "Need to bath",
          "description": "I need to bath",
          "tag": "bathing",
          "date": "2024-01-24T19:43:54.025Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(initialNotes); 

    return (
        <>
            <noteContext.Provider value={{notes, setNotes}}>
                {props.children}
            </noteContext.Provider>
        </>
    )
}
