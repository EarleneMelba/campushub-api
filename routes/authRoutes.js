const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/signup', signup);
router.post('/login', login);

const requireRole = require('../middleware/roleMiddleware');

router.get('/me', authMiddleware, (req, res) => {
    return res.status(200).json({
        message: 'You are authenticated',
        user: req.user,
    });
});

router.get('/super-admin-only', authMiddleware, requireRole('super_admin'), (req, res) => {
    return res.status(200).json({ message: 'Welcome, super admin', user: req.user });
});

module.exports = router;