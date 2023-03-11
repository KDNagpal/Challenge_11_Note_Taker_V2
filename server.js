const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const filePath = path.join(__dirname, '/db/db.json');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.listen(PORT, () =>
console.log(`Listening at http://localhost:${PORT}`));