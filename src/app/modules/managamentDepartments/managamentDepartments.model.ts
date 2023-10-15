import { IAcademicFaculty } from '../acdemicFaculy/acdemicFaculy.interface';
import {
  IMangaementDepartment,
  ManagementDepartmentModel,
} from './managamentDepartments.interface';
import { Schema, model } from 'mongoose';

const managamenentDepartmentSchema = new Schema<
  IAcademicFaculty,
  ManagementDepartmentModel
>(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const ManagamenentDepartment = model<IMangaementDepartment>(
  'ManagamenentDepartment',
  managamenentDepartmentSchema,
);
