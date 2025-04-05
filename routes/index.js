const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /ping:
 *  get:
 *     tags:
 *     - Ping
 *     description: Returns API operational status
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/ping', (req, res) => res.sendStatus(200));

// Import các routes khác
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const categoryRoutes = require('./categoryRoutes');
// ... các routes khác

// Định nghĩa prefix cho các routes
router.use('/api/users', userRoutes);
router.use('/api/courses', courseRoutes);
router.use('/api/categories', categoryRoutes);

// Error handling cho routes
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = router;
