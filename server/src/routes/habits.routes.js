import { Router } from 'express';
import * as habitsController from '#controllers/habits.controller.js';
import { authenticate } from '#middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', habitsController.getHabits);
router.post('/', habitsController.createHabit);
router.patch('/reorder', habitsController.reorderHabits);

router.get('/:id', habitsController.getHabit);
router.put('/:id', habitsController.updateHabit);
router.delete('/:id', habitsController.deleteHabit);
router.patch('/:id/archive', habitsController.archiveHabit);

export default router;
