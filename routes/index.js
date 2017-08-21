const router = require('express').Router();

router.use('/api', require('./queue'));
router.get('*', (req, res) =>
  res.status(404).json({ message: 'Route does not exist' })
);

module.exports = router;
