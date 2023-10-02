import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/pagination';
import { IAcademicSemister } from './academicSemester.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemester } = req.body;
    const result =
      await academicSemesterService.createAcademicSemester(academicSemester);
    next();

    sendResponse<IAcademicSemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Aademic semester created successfully!',
      data: result,
    });
    next();
  },
);

const getAllSemestersData = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationField);
  const result =
    await academicSemesterService.getAllSemesters(paginationOptions);
  sendResponse<IAcademicSemister[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
export const academicSemesterController = {
  createAcademicSemester,
  getAllSemestersData,
};
