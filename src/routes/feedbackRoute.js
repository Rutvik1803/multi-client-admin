const express = require('express');
const {
  submitFeedback,
  viewFeedback,
  changeVisibility,
} = require('../controller/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Public: Submit feedback
router.post('/:clientId', submitFeedback);
// Client only: View feedback
router.get('/', protect, authorize('client'), viewFeedback);
// Client only: Change visibility of feedback
router.patch('/:id', protect, authorize('client'), changeVisibility);

module.exports = router;
