import { Router } from 'express';

import MatchController = require('../controllers/MatchController');

const router = Router();

const matchController = new MatchController();

router.get('/', (req, res) => matchController.findAll(req, res));
// router.get('/:id', (req, res) => matchController.findById(req, res));

export default router;
