const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let notes = []

app.use(express.static("public"))

app.get("/api/notes", function(req, res){
    return res.json(notes)
});

app.delete(`/api/notes/:id`, (req, res) => {

    let id = req.params.id;
    for (let index = 0; index < notes.length; index++) {
        let currentNote = notes[index]
        if (currentNote.id == id) {
            notes.splice(index, 1)
            break
        }
    }
    saveNotes()
    res.end()
})

app.post(`/api/notes`, (req, res) =>{
    const bodyTitle = req.body.title
    const bodyText = req.body.text
    let newNote = {
        title: bodyTitle,
        text:bodyText,
        id: getHighestID()+1
    }
    notes.push(newNote)
    saveNotes()
    res.end()
})

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`)
})

function getHighestID(){
    let biggestChungus = 0
    for (let index = 0; index <notes.length; index++){
        if (notes[index].id > biggestChungus){
            biggestChungus = notes[index].id
        }
    }
    return biggestChungus
}

function loadNotes(){
    fs.readFile(path.join(__dirname, `db`, 'db.json'), `utf8`, (err, data) =>{
        if(err){
            console.log(err)
        }
        console.log(data)
        notes = JSON.parse(data)
    })
}

function saveNotes(){
    let data = JSON.stringify(notes)
    fs.writeFile(path.join(__dirname, `db`, `db.json`), data, (err) =>{
        if (err){
            console.log(err)
        }

    })
}

loadNotes()