import express from 'express';
import { ManagementDepartmentValidation } from './managamentDepartments.validation';
import validateRequest from '../../middleWares/validateRequest';
import { ManagementDepartmentController } from './managamentDepartments.controller';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManageDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);

router.get(
  '/:id',
  ManagementDepartmentController.getSinglelManagementDepartment,
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment,
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.updateManagementDepartment,
);

export const ManagamentDepartmentRoutes = router;
