import express from 'express'

import {
  getMessages,
  createMessage,
  deleteMessage,
} from '../controllers/messageController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/* GET ALL MESSAGES */

router.get('/', protect, getMessages)

/* CREATE NEW MESSAGE */

router.post('/', protect, createMessage)

/* DELETE MESSAGE */

router.delete('/:id', protect, deleteMessage)

export default router