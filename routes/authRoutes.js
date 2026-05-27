import express from 'express'

import {
  registerUser,
  loginUser,
  getMyProfile,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/* AUTH ROUTES */

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/verify-email/:token', verifyEmail)

router.post('/resend-verification', resendVerificationEmail)

router.post('/forgot-password', forgotPassword)

router.put('/reset-password/:token', resetPassword)

router.get('/me', protect, getMyProfile)

export default router