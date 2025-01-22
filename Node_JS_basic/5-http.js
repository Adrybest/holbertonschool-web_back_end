const http = require('http');
const fs = require('fs');

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

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  const databasePath = process.argv[2];

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    if (!databasePath) {
      res.statusCode = 500;
      res.end('Database file path not provided');
      return;
    }

    try {
      const studentsList = await countStudents(databasePath);
      res.statusCode = 200;
      res.end(`This is the list of our students\n${studentsList}`);
    } catch (err) {
      res.statusCode = 500;
      res.end(err.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
