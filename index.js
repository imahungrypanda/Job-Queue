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
app.get('/', (req, res) => {
  res.send('Return index of job queues?');
});

app.post('/', (req, res) =>{
  console.log('create database entry');
  console.log('start request to get HTML');
  res.status(200).send({})
});

app.get('*', (req, res) =>
  res.status(404).send({ message: 'Route does not exist' })
);
