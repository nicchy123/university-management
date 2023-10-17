import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req, res) => {
  console.log(req.body, res);
});

export const AuthController = {
  loginUser,
};
