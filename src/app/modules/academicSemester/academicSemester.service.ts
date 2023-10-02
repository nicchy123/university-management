import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodesMapper } from './academicSemester.constant';
import { IAcademicSemister } from './academicSemester.interface';
import { AcademicSemester } from './academicSemister.model';
import IPaginationOptions from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';

const createAcademicSemester = async (
  semester: IAcademicSemister,
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodesMapper[semester.title] !== semester.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code');
  }
  const result = await AcademicSemester.create(semester);
  return result;
};

const getAllSemesters = async (
  payload: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { page = 1, limit = 10 } = payload;
  const skip = (page - 1) * limit;
  const result = await AcademicSemester.find({}).sort().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const academicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
};
