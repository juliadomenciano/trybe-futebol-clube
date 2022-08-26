import { Router } from 'express';

import LeaderboardController = require('../controllers/LeaderboardController');

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', (req, res) => leaderboardController.findAll(req, res));

export default router;
