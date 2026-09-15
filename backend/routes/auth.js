const express = require('express');
const { login, register, showCurrentUser } = require('../controllers/auth');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.post('/login', login);
router.post('/register', register);
router.route('/profile').get(authenticate, showCurrentUser);

module.exports = router;