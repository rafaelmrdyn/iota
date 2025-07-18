/**
 * API routes
 */

const express = require('express');
const router = express.Router();

/**
 * GET API status
 */
router.get('/', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET sample endpoint
 */
router.get('/sample', (req, res) => {
  res.json({
    data: {
      id: 1,
      name: 'Sample data',
      description: 'This is a sample API endpoint'
    }
  });
});

module.exports = router;