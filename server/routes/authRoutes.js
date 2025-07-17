import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { forgotPassword } from '../controllers/authController.js';
import { resetPassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { changePassword } from '../controllers/authController.js';
import { changeEmail } from '../controllers/authController.js';


const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.put('/change-password', authMiddleware, changePassword);

router.put('/change-email', authMiddleware, changeEmail);

export default router;
