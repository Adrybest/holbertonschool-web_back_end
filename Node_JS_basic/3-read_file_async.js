const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Asynchronously read the file
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        try {
          const lines = data.split('\n').filter((line) => line.trim() !== '');

          const header = lines.shift();

          if (lines.length === 0) {
            throw new Error('No valid students found in the database.');
          }

          const studentsByField = {};

          lines.forEach((line) => {
            const fields = line.split(',');

            if (fields.length !== 4) {
              return;
            }

            const firstname = fields[0];
            const field = fields[3];

            if (!studentsByField[field]) {
              studentsByField[field] = [];
            }

            studentsByField[field].push(firstname);
          });

          const totalStudents = Object.values(studentsByField)
            .reduce((acc, curr) => acc + curr.length, 0);

          console.log(`Number of students: ${totalStudents}`);

          for (const field in studentsByField) {
            const studentList = studentsByField[field].join(', ');
            console.log(`Number of students in ${field}: ${studentsByField[field].length}. List: ${studentList}`);
          }

          resolve();
        } catch (error) {
          reject(new Error('Cannot load the database'));
        }
      }
    });
  });
}

module.exports = countStudents;
