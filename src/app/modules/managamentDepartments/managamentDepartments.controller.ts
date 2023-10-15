import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { MangaementDepartmentService } from './managamentDepartments.service';
import { IMangaementDepartment } from './managamentDepartments.interface';
import httpStatus from 'http-status';
import sendReponse from '../../../shared/sendResponse';
import { ManagementDepartmentsFilterableFields } from './managementDepartments.constant';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...payload } = req.body;
    const result =
      await MangaementDepartmentService.createMangaementDepartment(payload);
    sendReponse<IMangaementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ManagementDepartment created successfully!',
      data: result,
    });
  },
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ManagementDepartmentsFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await MangaementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions,
      );

    sendReponse<IMangaementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSinglelManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await MangaementDepartmentService.getSinglelManagementDepartment(id);

    sendReponse<IMangaementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single department fetched successfully',
      data: result,
    });
  },
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...payload } = req.body;
    const result = await MangaementDepartmentService.updateManagementDepartment(
      id,
      payload,
    );

    sendReponse<IMangaementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single department updated successfully',
      data: result,
    });
  },
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await MangaementDepartmentService.deleteManagementDepartment(id);
    sendReponse<IMangaementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' department deleted successfully',
      data: result,
    });
  },
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
