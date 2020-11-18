const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const Joi = require('joi')
const studentArray = require('./InitialData.js');
const { ValidationError } = require('joi');
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
    res.send({id: newStudent.id});

});

app.put('/api/student/:id',(req,res) => {
    const id = req.params.id;
    const studentIndex = studentArray.findIndex(student => student.id === parseInt(id));
    
    if(studentIndex === -1) { 
        res.status(400).send("Bad request");
        return;
    }
    const studentSchema = Joi.object({
        name: Joi.string(),
        currentClass: Joi.number(),
        division: Joi.string()
    });

    const {error,value} = studentSchema.validate(req.body);
    if(error !== undefined) {
        res.status(400).send("Invalid input");
        return;
    }
    const studentObj = studentArray[studentIndex];
    for (const key in req.body) {
        
            studentObj[key] = req.body[key];
    }
    //studentArray.splice(studentIndex,1,{id: parseInt(id),...req.body});
    res.status(200).send("Updated");

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