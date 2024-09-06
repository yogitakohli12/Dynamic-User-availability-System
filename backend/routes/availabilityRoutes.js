// backend/routes/availabilityRoutes.js
const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');

// Route to add availability
router.post('/', async (req, res) => {
  const { user, start, end, duration} = req.body;
  try {
    const availability = new Availability({ user, start, end, duration });
    await availability.save();
    res.json(availability);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to get availability for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const availability = await Availability.find({ user: req.params.userId });
    res.json(availability);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.delete('/', async (req, res) => {
  const { start, end } = req.body;
  try {
      const user = await Availability.findOne({  user: req.params.userId });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      user.availability = user.availability.filter(slot => 
          !(new Date(slot.start).getTime() === new Date(start).getTime() && 
            new Date(slot.end).getTime() === new Date(end).getTime())
      );
      await user.save();
      res.status(200).json({ message: 'Availability slot deleted successfully', user });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting availability slot', error });
  }
});
module.exports = router;
