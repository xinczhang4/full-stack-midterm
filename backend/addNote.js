const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB 
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Note model
const Note = require('./server');

// Get all notes
// app.get('/notes', async (req, res) => {
//     try {
//       const notes = await Note.find({});
//       res.send(notes);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });
  
// Add a note
// app.post('/notes', async (req, res) => {
// const newNote = new Note({
//     title: req.body.title,
//     content: req.body.content
// });

// try {
//     const savedNote = await newNote.save();
//     res.send(savedNote);
// } catch (error) {
//     res.status(500).send(error);
// }
// });

// Log when fetching notes
app.get('/notes', async (req, res) => {
    try {
      const notes = await Note.find({});
      console.log(notes);  // Check the structure and presence of _id
      res.send(notes);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Log when saving a new note
app.post('/notes', async (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const savedNote = await newNote.save();
        console.log(savedNote);  // Ensure _id is logged
        res.send(savedNote);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Delete a note
app.delete('/notes/:id', async (req, res) => {
try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
} catch (error) {
    res.status(500).send(error);
}
});

const PORT = process.env.PORT || 5002
app.listen(PORT, () => console.log(`PORT: ${PORT}`))
  