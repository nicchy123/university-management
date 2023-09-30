import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemester } = req.body;
    const result =
      await academicSemesterService.createAcademicSemester(academicSemester);
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester crated successfully',
      data: result,
    });
  },
);
export const academicSemesterController = { createAcademicSemester };
