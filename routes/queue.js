const router   = require('express').Router(),
      mongoose = require('mongoose')
      request  = require('request'),
      http     = require('http'),
      queue = require('async').queue(function(task, callback) {
        console.log('Job queued');

        http.get({ host: task.url }, function(res) {
          let response_html = '';

          res.on('data', function(data) {
            response_html += data.toString();
          });

          res.on('end', () => {
            callback(response_html);
          });
        })
        .on('error', (e) => {
          console.log("Got error: " + e.message);
        });
      }, 10);

queue.drain = function() {
  console.log('Queue has finised processing!');
}

// Job Status
router.get('/:id', (req, res) => {
  let Request = mongoose.model('Request'),
      status;

  Request.findById(req.params.id, (err, job) => {
    if (err) res.status(500).json({ message: error });

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

  job.save((err) => {
    if (err) res.status(500).json({ message: error });
    queue.push({ url, id: job.id }, (response_html) => {
      Request.update({ _id: job.id }, { response_html: response_html, status: 'Complete' }, (err) => {
        if (err) {
          console.log('ERROR: ', err) }
        });
    });
    res.json({ id: job.id });
  });
});

module.exports = router;
