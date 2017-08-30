const router = require('express').Router();
const mongoose = require('mongoose');
const http = require('http');
const queue = require('async').queue(
  function (task, callback) {
    console.log('Job queued');

    http.get({ host: task.url }, function (res) {
      let responseHTML = '';

      res.on('data', function (data) {
        responseHTML += data.toString();
      });

      res.on('end', () => {
        callback(responseHTML);
      });
    })
      .on('error', (e) => {
        console.log('Got error: ' + e.message);
      });
  }, 10);

queue.drain = function () {
  console.log('Queue has finised processing!');
};

// Job Status
router.get('/:id', (req, res) => {
  let Request = mongoose.model('Request');

  Request.findById(req.params.id, (err, job) => {
    if (err) res.status(500).json({ message: err });

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
  let url = req.query.url;
  let Request = mongoose.model('Request');
  let job = new Request({ request_url: url, status: 'In progress' });

  job.save((err) => {
    if (err) res.status(500).json({ message: err });
    queue.push({ url, id: job.id }, (responseHTML) => {
      Request.update({ _id: job.id }, { response_html: responseHTML, status: 'Complete' }, (err) => {
        if (err) {
          console.log('ERROR: ', err);
        }
      });
    });
    res.json({ id: job.id });
  });
});

module.exports = router;
