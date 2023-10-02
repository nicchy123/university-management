import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);

router.get('/', academicSemesterController.getAllSemestersData);
export const semesterRoute = router;
