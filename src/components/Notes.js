import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItems from "./NoteItems";

const Notes = () => {
  const context = useContext(noteContext);
  const { noteData, getNotes,editNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"default"})

  useEffect(() => {
    getNotes();
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
  };


    const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
 
    }

    const handleSubmit =(e)=>{
      e.preventDefault(); 
      editNote(note.id,note.etitle,note.edescription,note.etag)
      ref.current.click();

    }



  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              {/* Form */}
              <form>
                <div className="mb-3">
                  <label htmlFor="title " className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    className="form-control"
                    value={note.etitle}
                    id="etitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edescription"
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                  />
                </div>
              </form>
              {/*Form ends  */}
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  type="button" onClick={handleSubmit} className="btn btn-primary">
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {noteData.map((note) => {
          return <NoteItems note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
