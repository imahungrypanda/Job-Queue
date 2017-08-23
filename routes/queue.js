const router   = require('express').Router(),
      mongoose = require('mongoose')
      request  = require('request'),
      URL = require('url');

      const http = require('http');

// Job Status
router.get('/:id', (req, res) => {
  let Request = mongoose.model('Request'),
      status;

  Request.findById(req.params.id, (err, job) => {
    if (err) res.status(500).json({ message: error });
console.log(job);
    res.json({
      id: job.id,
      url: job.request_url,
      status: job.status,
      html: job.response_html
    });
  });
});

// Create job
router.post('/request', (req, res) => {
  let url = req.query.url,
      Request = mongoose.model('Request'),
      job = new Request({ request_url: url, status: 'In progress' });

  job.save((err, job) => {
    if (err) res.status(500).json({ message: error });
    res.json({ id: job.id });

  http.get({ host: url }, function(res) {
    let response_html = '';

    res.on('data', function(data) {
      response_html += data.toString();
    });

    res.on('end', () => {
      Request.update({ _id: job.id }, { response_html: response_html, status: 'Complete' }, (err) => console.log('Updated: ', err));
    });
  })
  .on('error', function(e) {
    console.log("Got error: " + e.message);
  });
});
});

module.exports = router;
