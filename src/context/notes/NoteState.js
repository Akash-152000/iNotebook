import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{

    const notes = []

    const [noteData,setNoteData] = useState(notes);
    const host = "http://localhost:5000"
  
    //Fetch all notes
    const getNotes = async () =>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDU4YWVkNjcyMjQxY2YzOTVkNWM4In0sImlhdCI6MTY3OTY0NDg3M30.zL_RVj9ZRLvlvx_24sz-D4GDAwIHdgWeg6bIcJO-grQ"
        },
      });
      const json = await response.json()

      setNoteData(json)
    }
  
  
    // Add a note
  
    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDU4YWVkNjcyMjQxY2YzOTVkNWM4In0sImlhdCI6MTY3OTY0NDg3M30.zL_RVj9ZRLvlvx_24sz-D4GDAwIHdgWeg6bIcJO-grQ"
        },
        body: JSON.stringify({title, description, tag})
        
      });
      
      const note = await response.json();
      setNoteData(noteData.concat(note))
    }

    // Delete a note

    

      const deleteNote = async (id) =>{
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDU4YWVkNjcyMjQxY2YzOTVkNWM4In0sImlhdCI6MTY3OTY0NDg3M30.zL_RVj9ZRLvlvx_24sz-D4GDAwIHdgWeg6bIcJO-grQ"
          },
        });
        const json = await response.json()
        const newNotes = noteData.filter((note)=>{return note._id!==id})
        setNoteData(newNotes)
        console.log(json);
      }
      
    

    // Edit a note
    const editNote= async(id,title,description,tag)=>{ 
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDU4YWVkNjcyMjQxY2YzOTVkNWM4In0sImlhdCI6MTY3OTY0NDg3M30.zL_RVj9ZRLvlvx_24sz-D4GDAwIHdgWeg6bIcJO-grQ"
        },
        body: JSON.stringify({title, description, tag})
        
      });
      
      const json = await response.json();

      let newNotes = JSON.parse(JSON.stringify(noteData))
      
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id)
        {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNoteData(newNotes)

    }


    

    return(
        <noteContext.Provider value = {{noteData, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;