const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/register', adminMiddleware, registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
