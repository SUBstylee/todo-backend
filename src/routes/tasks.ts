import { Router } from 'express';
import {
	getTasks,
	updateTask,
	deleteTask,
} from '../controllers/taskController.js';

const router = Router();

router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
