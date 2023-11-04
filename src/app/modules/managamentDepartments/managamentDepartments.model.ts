import {
  ManagementDepartmentModel,
  IMangaementDepartment,
} from './managamentDepartments.interface';
import { Schema, model } from 'mongoose';

const ManagementDepartmentSchema = new Schema<
  IMangaementDepartment,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const ManagementDepartment = model<
  IMangaementDepartment,
  ManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema);
