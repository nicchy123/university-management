import { IStudent } from './../student/student.interface';
import { Model, Types } from 'mongoose';

// Document interface
export type IUser = {
  faculty: Types.ObjectId;
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty; future
  // admin?: Types.ObjectId | IAdmin; future
};

export type UserModel = Model<IUser, Record<string, unknown>>;
