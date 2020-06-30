const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");

let notes = [{
    pastNotes: "Testing stuff"
}]


app.get("/api/notes", function(req, res){
    return res.json(notes)
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`)
})