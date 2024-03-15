const express = require('express');
const router = express.Router();
const Meal = require('./mealModel');

router.post('/meals', async (req, res) => {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;