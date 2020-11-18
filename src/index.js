const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

const studentArray = require('./InitialstudentArray.js');
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student',(req,res) => {
    res.send(studentArray);
});

app.get('/api/student/:id',(req,res) => {
    const id = req.params.id;
    const student = studentArray.find((student) => student.id === parseInt(id));
    if(!student) {
        res.status(404).send("Student not found");
        return;
    }
    res.send(student);

});

app.post('/api/student',(req,res) => {
    const {name, currentClass, division} = req.body;
    if((!name) || (!currentClass) || (!division)) {
        res.status(400).send("Bad request");
        return;
    }
    const newStudent = {
        id: studentArray.length + 1,
        name: name,
        currentClass: parseInt(currentClass),
        division: division
    }
    studentArray.push(newStudent);
    res.send(newStudent.id);

});

app.put('/api/student/:id',(req,res) => {
    const id = req.params.id;
    const student = studentArray.find(student => student.id === parseInt(id));
    
    if((!student) || (!newName)) { 
        res.status(400).send("Bad request");
        return;
    }
    const newName = req.body.name;
    student.name = newName;

});

app.delete('/api/student/:id',(req,res) => {
    const id = req.params.id;
    const studentIndex = studentArray.findIndex((student) => parseInt(id) === student.id);
    if(studentIndex === -1) {
        res.status(404).send("Student not found");
        return;
    }
    
    studentArray.splice(studentIndex,1);
    res.status(200).send(`STudent with ${id} deleted`);
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   