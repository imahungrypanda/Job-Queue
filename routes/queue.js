const router = require('express').Router(),
      mongoose = require('mongoose');


// Job Status
router.get('/:id', (req, res) => {
  let Request = mongoose.model('Request'),
      status;
  console.log('Request id: ', req.params.id);

  Request.findById(req.params.id, (err, job) => {
    if (err) res.status(500).json({ message: error });
    console.log('Get job: ', job);

    status = job.request_html === undefined ? 'In progress' : ' Complete';

    res.json({
      id: job.id,
      request_url: job.request_url,
      status: status,
      html: job.request_html
    });
  });
});

// Create job
router.post('/request', (req, res) => {
  console.log(req);
  let url = req.query.url,
      Request = mongoose.model('Request'),
      job = new Request({ request_url: url });

  job.save((err, job) => {
    if (err) res.status(500).json({ message: error });

    // console.log('start request to get HTML');
    res.json({ id: job.id });
  });
});

module.exports = router;
