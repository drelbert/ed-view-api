import { Router } from 'express';
import controllers from './student.controllers.mjs';

const router = Router();

// /api/student
// using a relative route with the .route method
router.route('/create').post(controllers.createOne);

// /api/student /all
router.route('/all').get(controllers.getAll);

// /api/student/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

export default router;
