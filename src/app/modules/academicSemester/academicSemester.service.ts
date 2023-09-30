import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodesMapper } from './academicSemester.constant';
import { IAcademicSemister } from './academicSemester.interface';
import { AcademicSemester } from './academicSemister.model';

const createAcademicSemester = async (
  semester: IAcademicSemister,
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodesMapper[semester.title] !== semester.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code');
  }
  const result = await AcademicSemester.create(semester);
  return result;
};

export const academicSemesterService = { createAcademicSemester };
