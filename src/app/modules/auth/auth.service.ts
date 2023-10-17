import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 },
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password,
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password didn't matched");
  }
};

export const AuthService = {
  loginUser,
};
