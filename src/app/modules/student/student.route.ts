import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { StudentController } from './student.controller';
import { StudentValidaion } from './student.validation';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validateRequest';
const router = express.Router();

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  StudentController.getSingleStudent,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.deleteStudent,
);

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.updateStudent,
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  StudentController.getAllStudents,
);

export const StudentRoutes = router;
