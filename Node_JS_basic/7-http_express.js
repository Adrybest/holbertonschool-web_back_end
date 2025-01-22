const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 1245;

function countStudents(databasePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length === 0) {
        resolve('No students found');
        return;
      }

      const header = lines[0].split(',');
      const students = lines.slice(1).map((line) => {
        const fields = line.split(',');
        const student = {};
        fields.forEach((field, index) => {
          student[header[index]] = field;
        });
        return student;
      });

      const csStudents = students.filter((student) => student.field === 'CS');
      const sweStudents = students.filter((student) => student.field === 'SWE');

      let output = `Number of students: ${students.length}\n`;
      output += `Number of students in CS: ${csStudents.length}. List: ${csStudents.map((s) => s.firstname).join(', ')}\n`;
      output += `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map((s) => s.firstname).join(', ')}`;

      resolve(output);
    });
  });
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  const databasePath = process.argv[2];

  if (!databasePath) {
    res.status(500).send('Database file path not provided');
    return;
  }

  try {
    const studentsList = await countStudents(databasePath);
    res.send(`This is the list of our students\n${studentsList}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
