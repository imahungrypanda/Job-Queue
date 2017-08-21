const express = require('express'),
      app = express(),
      fs = require('fs'),
      { exec } = require('child_process');

const { PORT = 3000, NODE_ENV = 'development', DB = './db/database.db'} = process.env;

// Start Server
Promise.resolve()
  // Create database
  .then(() => {
    if (!fs.existsSync(DB)) {
      exec(`cat db/create_database.sql | sqlite3 ${DB}`, (error) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log('Database created');
      });
    }
    else {
      console.log('Database already exists');
    }
  })
  .then(() => app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
  ))
  .catch(err => {
    if (NODE_ENV === 'development') console.error(err.stack);
});

// Routes
// NOTE: Consider '/' route to return the readme
app.use(require('./routes'));

module.export = app;
