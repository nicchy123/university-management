import { User } from './user.model';
import { IUser } from './user.interface';
import config from '../../../config';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const id = await generateUserId();
  user.id = id;
  const createdUser = await User.create(user);

  if (!createUser) throw new Error('Failed to crate user!');
  return createdUser;
};

export const usersService = {
  createUser,
};
