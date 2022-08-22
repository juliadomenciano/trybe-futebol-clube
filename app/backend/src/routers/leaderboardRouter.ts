import { Router } from 'express';

import LeaderboardController = require('../controllers/LeaderboardController');

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.findAll(req, res));

// router.post('/', (req, res) => leaderboardController.create(req, res));
// router.patch('/:id/finish', (req, res) => leaderboardController.update(req, res));
// router.patch('/:id', (req, res) => leaderboardController.updateGoals(req, res));

export default router;
