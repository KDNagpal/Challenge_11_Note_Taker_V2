const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const filePath = path.join(__dirname, '/db/db.json');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//creates pathway
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

//route for getting all notes
app.get('/api/notes', (req, res) => {
    const notes = getNotes()
    res.json(notes);
    console.log('Notes loaded!!')
});

//post route for new notes
app.post('/api/notes', (req, res) => {
    const notes = getNotes()
    const newNote = {
        id: notes.length + 1,
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote)
    console.log('Note created!!')
});

//deletes note
app.delete('/api/notes/:id', (req, res) => {
    const notes = getNotes();
    const id = parseInt(req.params.id);
    const filteredNotes = notes.filter(note => note.id !== id);
    saveNotes(filteredNotes);
    console.log('Note Deleted!!')
  });

//reads notes from .json file
function getNotes() {
    const data = fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf-8');
    return JSON.parse(data);

}

//writes notes to .json file
function saveNotes(notes) {
    const data = JSON.stringify(notes);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), data);
}

app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`));