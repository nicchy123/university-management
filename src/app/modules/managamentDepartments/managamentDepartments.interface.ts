import { Model } from 'mongoose';

export type IMangaementDepartment = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ManagementDepartmentModel = Model<
  IMangaementDepartment,
  Record<string, unknown>
>;

export type IMangaementDepartmentFilters = {
  searchTerm?: string;
};
