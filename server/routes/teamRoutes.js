const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// @route   GET /api/teams
// @desc    Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/teams
// @desc    Register a new team
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    leader: req.body.leader,
    members: req.body.members,
    project: req.body.project,
  });

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
