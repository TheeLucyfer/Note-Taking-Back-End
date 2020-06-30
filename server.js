const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");

let notes = [{
    pastNotes: "Testing stuff"
}]

app.use(express.static("public"))

app.get("/api/notes", function(req, res){
    return res.json(notes)
});

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`)
})