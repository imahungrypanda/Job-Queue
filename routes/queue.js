const router = require('express').Router();
      // sqlite = require('sqlite');


// Job Status
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.json({ id: 'id of new job' });
});

// Create job
router.post('/request', (req, res) => {
  let url = req.params.url;
  // console.log(sqlite);
  // let insert = sqlite.prepare('INSERT INTO jobs(request_url) VALUES(?)');

  // sqlite.run(`INSERT INTO jobs(request_url) VALUES(?);`, url).then(db => {
  // sqlite.prepare('INSERT INTO jobs(request_url) VALUES(?)').run(url).finalize().then(db => {

    // console.log(db);

    console.log('create database entry');
    console.log('start request to get HTML');
    res.json({ test: "something goes here" });
  // });
});

module.exports = router;
