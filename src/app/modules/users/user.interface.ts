import { IAdmin } from '../admin/admin.intrerface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from './../student/student.interface';
import { Model, Types } from 'mongoose';

// Document interface
export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
  needsPasswordChange: true | false;
};
export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
