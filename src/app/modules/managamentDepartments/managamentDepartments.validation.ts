import { z } from 'zod';
const createManageDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createManageDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
};
