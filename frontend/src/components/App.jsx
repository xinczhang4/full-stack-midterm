// App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

import axios from 'axios';


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });


   // When notes are fetched
useEffect(() => {
  axios.get('http://localhost:5002/notes')
    .then(response => {
      console.log(response.data);  // Log to check structure
      setNotes(response.data);
    })
    .catch(error => console.error('Error fetching notes', error));
}, []);

// When adding a note
const addNote = () => {
  axios.post('http://localhost:5002/notes', newNote)
    .then(response => {
      console.log(response.data);  // Check for _id
      setNotes(prevNotes => [...prevNotes, response.data]); // Ensure response.data contains the ID
    })
    .catch(error => console.error('Error adding note', error));
  setNewNote({ title: "", content: "" });
};


  const deleteNote = (id) => {
    console.log(`Attempting to delete note with ID: ${id}`);  // Debug log
    axios.delete(`http://localhost:5002/notes/${id}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        console.log(`Deleted note with ID: ${id}`);  // Confirm deletion in the console
      })
      .catch(error => {
        console.error('Error deleting note', error);
        console.log(`Failed to delete note with ID: ${id}`);  // Error detail
      });
  };
  
  
  
  // const addNote = () => {
  //   setNotes((prevNotes) => {
  //     return [...prevNotes, { ...newNote, id: Date.now() }]; // Using Date.now() to generate a unique id for each note
  //   });
  //   setNewNote({ title: "", content: "" }); // Reset the input after adding
  // };

  // const deleteNote = (id) => {
  //   setNotes((prevNotes) => {
  //     return prevNotes.filter((note) => note.id !== id);
  //   });
  // };

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
            key ={note._id}
            id={note._id}
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
