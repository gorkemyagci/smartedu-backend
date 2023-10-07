const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').get(authController.getAllUsers);
router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').post(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/send-mail').post(authController.sendEmail);
router.route('/admin').get(roleMiddleware(["admin"]), authController.adminPage);
router.route('/:id').delete(roleMiddleware(["admin"]), authController.deleteUser);

module.exports = router;