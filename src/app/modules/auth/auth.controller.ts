import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  console.log(req.body, res);
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logged in successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
