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
      id: 1,
      title: "No title 1",
      content: "No content 1"
    },
    {
      id: 1,
      title: "No title 1",
      content: "No content 1"
    },
    {
      id: 1,
      title: "No title 1",
      content: "No content 1"
    }]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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

  return <div className="app-container">
    <form
      onSubmit={(event)=>handleAddNote(event)}
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
      <button type="submit">
        Add Note
      </button>
    </form>
    <div className="notes-grid">
      {notes.map((note)=>(
        <div className="note-item">
        <div className="notes-header">
          <button>X</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
      ))}       
    </div>
  </div>
};

export default App;