const router = require('express').Router();

// Job Status
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.json({ id: 'id of new job' });
});

// Create job
router.post('/request', (req, res) => {
  console.log('create database entry');
  console.log('start request to get HTML');
  res.json({});
});

module.exports = router;
