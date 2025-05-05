import { Router} from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets',mocksController.createPets); //:npets
router.get('/mockingusers',mocksController.createUsers); //:nusers
router.post('/generatedata',mocksController.generateData);

export default router;