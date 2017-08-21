const express = require('express'),
      app = express();

const { PORT = 3000, NODE_ENV = 'development', DB = './db/databse.db'} = process.env;

// Start Server
Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`)))
  .catch(err => {
    if (NODE_ENV === 'development') console.error(err.stack);
});

// Routes
app.get('/', (req, res) => {
  res.send('Return index of job queues?');
});
