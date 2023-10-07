import express from 'express';
import { userRoutes } from '../app/modules/users/user.route';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
