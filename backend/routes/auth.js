const express = require('express');
const {
    login,
    register,
    showCurrentUser,
    updateUser,
    updatePassword
} = require('../controllers/auth');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.post('/login', login);
router.post('/register', register);
router.route('/profile')
    .get(authenticate, showCurrentUser)
    .put(authenticate, updateUser);
router.put('/change-password', authenticate, updatePassword)

module.exports = router;