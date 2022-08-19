import { Router } from 'express';

import AuthController = require('../controllers/AuthController');

const router = Router();

const authController = new AuthController();

router.post('/', (req, res) => authController.login(req, res));
router.get('/validate', (req, res) => authController.validation(req, res));

export default router;
