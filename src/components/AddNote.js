import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const AlertContext = useContext(alertContext)
  const {showAlert} = AlertContext

  const [note, setNote] = useState({title:"",description:"",tag:"default"})

    const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
        
 
    }

    const handleSubmit =(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title:" ",description:" ",tag:"default"})
      showAlert("Note Added Succesfully","success")
    }


  return (
    <div className="container">
      <h2 className="my-3">Add notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title " className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required 
            />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
      <h2 className="my-3">Your notes</h2>
    </div>
  );
};

export default AddNote;
