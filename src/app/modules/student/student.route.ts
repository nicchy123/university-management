import express from 'express';
import { StudentController } from './student.controller';
import { StudentValidaion } from './student.validation';
import validateRequest from '../../middleWares/validateRequest';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
