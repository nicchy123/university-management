import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelpers';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const user = new User();
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }
  if (
    isUserExist?.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password didn't matched");
  }
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in,
    },
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    {
      expiresIn: config.jwt.refresh_expires_in,
    },
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
