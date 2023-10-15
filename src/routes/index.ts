import express from 'express';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../app/modules/acdemicFaculy/acdemicFaculy.route';
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartments.route';
import { userRoutes } from '../app/modules/users/user.route';
import { StudentRoutes } from '../app/modules/student/student.route';
import { managamentDepartmentRoutes } from '../app/modules/managamentDepartments/managamentDepartments.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/management-departments',
    route: managamentDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
