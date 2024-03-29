// App.jsx
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import initialNotes from "../notes";

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const addNote = () => {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...newNote, id: Date.now() }]; // Using Date.now() to generate a unique id for each note
    });
    setNewNote({ title: "", content: "" }); // Reset the input after adding
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setNewNote((prevNote) => {
      return { ...prevNote, title: value };
    });
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    setNewNote((prevNote) => {
      return { ...prevNote, content: value };
    });
  };

  return (
    <div>
      <Header />
      <div className="create-note">
        <input
          value={newNote.title}
          onChange={handleTitleChange}
          type="text"
          placeholder="Title"
        />
        <textarea
          value={newNote.content}
          onChange={handleContentChange}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={addNote}>Add</button>
      </div>
      <div className="note-container">
        {notes.map((note) => (
          <Note
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
