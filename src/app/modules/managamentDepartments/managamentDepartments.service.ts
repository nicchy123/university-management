import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/pagination';
import {
  IMangaementDepartment,
  IMangaementDepartmentFilters,
} from './managamentDepartments.interface';
import { ManagementDepartmentsFilterableFields } from './managementDepartments.constant';
import { ManagementDepartment } from './managamentDepartments.model';

const createMangaementDepartment = async (payload: IMangaementDepartment) => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartments = async (
  filters: IMangaementDepartmentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IMangaementDepartment[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: ManagementDepartmentsFilterableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglelManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findOne({ _id: id });
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IMangaementDepartment>,
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

const deleteManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id });
  return result;
};

export const MangaementDepartmentService = {
  createMangaementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
