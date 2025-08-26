import { Router } from 'express';
import { getTasks, updateTask } from '../controllers/taskController.js';

const router = Router();

router.get('/', getTasks);
router.put('/:id', updateTask);

export default router;
