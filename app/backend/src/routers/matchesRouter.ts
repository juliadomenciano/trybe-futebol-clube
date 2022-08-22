import { Router } from 'express';

import MatchController = require('../controllers/MatchController');

const router = Router();

const matchController = new MatchController();

router.get('/', (req, res) => matchController.findAll(req, res));
router.post('/', (req, res) => matchController.create(req, res));
router.patch('/:id/finish', (req, res) => matchController.update(req, res));
router.patch('/:id', (req, res) => matchController.updateGoals(req, res));

export default router;
