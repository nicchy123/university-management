import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemister.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (student: IStudent, user: IUser) => {
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  user.role = 'student';
  const academicsemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  let newUserAlldata = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length)
      throw new ApiError(httpStatus.BAD_REQUEST, 'fail to create student');
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'fail to create student');
    }
    newUserAlldata = newStudent[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAlldata) {
    newUserAlldata = await User.findOne({ id: newUserAlldata.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
    return newUserAlldata;
  }
};

export const UserService = {
  createStudent,
};
