const express = require('express'),
      app = express(),
      mongoose = require('mongoose');

const { PORT = 3000, NODE_ENV = 'development', DB = './db/database.db'} = process.env;

// Start Server
Promise.resolve()
  // Create database
  .then(() => {
    mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, err => {
      if (err) {
        console.error.bind(console, 'connection error:');
        return;
      }
      console.log('Database connected');

      let requestSchema = new mongoose.Schema({
        request_url:   String,
        response_html: String,
        status:        String
      });

      module.exports = mongoose.model('Request', requestSchema);
    });
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
