const router = require('express').Router(),
      mongoose = require('mongoose');


// Job Status
router.get('/:id', (req, res) => {
  let Request = mongoose.model('Request');
  console.log('Request id: ', req.params.id);

  Request.findById(req.params.id, (err, job) => {
    if (err) res.status(500).json({ message: error });
    console.log('Get job: ', job);

    res.json({ id: job.id });
  });
});

// Create job
router.post('/request', (req, res) => {
  let url = req.params.url,
      Request = mongoose.model('Request'),
      job = new Request({ request_url: url });

  console.log('Job1: ', job);
  job.save((err, job) => {
    if (err) res.status(500).json({ message: error });

    console.log('create database entry');
    console.log('start request to get HTML');
    res.json({ id: job.id });
  });
});

module.exports = router;
