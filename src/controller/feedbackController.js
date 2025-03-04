const Feedback = require('../models/Feedback');
const submitFeedback = async (req, res) => {
  const { userName, userEmail, message, rating } = req.body;

  if (!userName || !userEmail || !message || !rating) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const feedback = new Feedback({
      client: req.params.clientId,
      userName,
      userEmail,
      message,
      rating,
    });
    await feedback.save();
    return res.status(201).json({ message: 'Feedback submitted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Client only: View feedback
const viewFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ client: req.user.id });
    return res.status(200).json({ feedback });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

//Client only: Changing the visibility of feedback
const changeVisibility = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    feedback.visible = !feedback.visible;
    await feedback.save();
    return res.status(200).json({ message: 'Visibility changed' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { submitFeedback, viewFeedback, changeVisibility };
