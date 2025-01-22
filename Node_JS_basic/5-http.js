const http = require('http');
const url = require('url');
const countStudents = require('./3-read_file_async');
const path = process.argv[2];
const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  res.setHeader('Content-Type', 'text/plain');

  // Handle the root path `/`
  if (parsedUrl.pathname === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  }

  else if (parsedUrl.pathname === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');

    countStudents(path)
      .then(() => {
        res.end();
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(error.message);
      });
  }

  else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
