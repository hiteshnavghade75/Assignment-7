const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const initialData = require('./InitialData')
const deletedIds = [];
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student', (req, res) => {
  res.status(200).json(initialData);
});

app.get('/api/student/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const student = initialData.find((student) => student.id === studentId);
  if (student) {
    res.status(200).json(student);
  }
  else {
    res.status(404).json({
      error: 'Invalid student id'
    });
  }
});

app.post("/api/student", (req, res) => {
  const { name, currentClass, division } = req.body
  newId = initialData.length + 1
  while (deletedIds.includes(newId)) {
    newId++;
  }
  if (name && currentClass && division) {
    initialData.push({
      id: newId,
      name,
      currentClass,
      division
    })
    res.status(200).json({
      id: newId
    });
  }
  else {
    res.status(400).json({
      message: "Provide all details"
    });
  }
});

app.put('/api/student/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const updatedStudent = req.body
  console.log(updatedStudent)
  const student = initialData.find((student) => student.id === studentId);
  if (student) {
    if (updatedStudent) {
      student.name = updatedStudent.name;
      student.currentClass = updatedStudent.currentClass;
      student.division = updatedStudent.division;
      res.json({ name: updatedStudent });
    }
    else {
      res.status(400).json({ error: 'Failed to update' });
    }
  }
  else {
    res.status(400).json({ error: 'Invalid student id' });
  }
});

app.delete('/api/student/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const studentIndex = initialData.findIndex((student) => student.id === studentId);
  if (studentIndex !== -1) {
    initialData.splice(studentIndex, 1);
    deletedIds.push(studentId)
    res.json({
      message: 'Student deleted successfully'
    });
  }
  else {
    res.status(404).json({
      error: 'Student not found'
    });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   