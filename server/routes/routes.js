const router = require('express').Router();
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const base = 'api/v1';

router.use(`/${base}/users`, userRoutes);
router.use(`/${base}/auth`, authRoutes);

module.exports = router;
