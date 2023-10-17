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
};

export type UserModel = Model<IUser, Record<string, unknown>>;
