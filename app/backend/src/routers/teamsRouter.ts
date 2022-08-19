import { Router } from 'express';

import TeamsController = require('../controllers/TeamController');

const router = Router();

const teamsController = new TeamsController();

router.get('/', (req, res) => teamsController.findAll(req, res));
router.get('/:id', (req, res) => teamsController.findById(req, res));

export default router;
