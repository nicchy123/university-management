import express from 'express';
import { AcademicFacultyController } from './acdemicFaculy.controller';
import validateRequest from '../../middleWares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty,
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFaculty,
);
router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
