import { AcademicFacultyService } from './acdemicFaculy.service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './acdemicFaculy.interface';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { paginationFields } from '../../../constants/pagination';
import { academicFacultyFilterableFields } from './acdemicFaculy.constants';
import pick from '../../../shared/pick';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...title } = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(title);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Aademic Faculty created successfully!',
      data: result,
    });
  },
);

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Aademic Faculty Deleted successfully!',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty fetched successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, data);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty Updated successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  deleteFaculty,
  updateFaculty,
  getSingleFaculty,
  getAllFaculties,
};
