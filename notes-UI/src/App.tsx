import { eventNames } from "process";
import "./App.css"
import { useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]> ([
    
    {
      id: 1,
      title: "No title 1",
      content: "No content 1"
    },
    {
      id: 2,
      title: "No title 2",
      content: "No content 2"
    },
    {
      id: 3,
      title: "No title 3",
      content: "No content 3"
    },
    {
      id: 4,
      title: "No title 4",
      content: "No content 4"
    }]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [selectedNote, setSelectedNote] = 
    useState<Note | null>(null);

    const handleNoteClick = (note:Note) => {
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content)
    }

    const handleAddNote = (
      event: React.FormEvent
    ) => { 
      event?.preventDefault()
      const newNote: Note = {
        id: notes.length + 1,
        title: title,
        content: content
      };

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    };

    const handleUpdateNote = (event: React.FormEvent) => {
      event?.preventDefault();
      if(!selectedNote){
        return;
      }
      const updatedNote: Note = {
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content
      }
      const updateNoteList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    )
    setNotes(updateNoteList)
    setTitle("")
    setContent("")
    setSelectedNote(null)
    };

    const handleCancel = () => {
      setTitle("")
      setContent("")
      setSelectedNote(null)
    };

    const deleteNote = (event: React.MouseEvent, noteId: number) => {
      event.stopPropagation();
      const updatedNote = notes.filter(
        (note) => note.id != noteId
      )
      setNotes(updatedNote);
    };

  return <div className="app-container">
    <form
      onSubmit={(event)=> selectedNote ? handleUpdateNote(event) : handleAddNote(event)}
      className="note-form"
    ><input 
    value={title}
    onChange={(event)=>
      setTitle(event?.target.value)}
      placeholder="Title"
      required
    ></input>
      <textarea
      value={content}
      onChange={(event)=>
        setContent(event.target.value)
      }
        placeholder="Content"
        rows={10}
        required
      ></textarea>
      {selectedNote ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>
            Cancel
            </button>
        </div>
      ):(
        <button type="submit">Add Note</button>
      )}      
    </form>
    <div className="notes-grid">
      {notes.map((note)=>(
        <div key={note.id} className="note-item" onClick={()=>handleNoteClick(note)}>
        <div className="notes-header">
          <button onClick={(event) => deleteNote(event, note.id)}>X</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
      ))}       
    </div>
  </div>
};

export default App;