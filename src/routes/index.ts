import express from 'express';
import { userRoutes } from '../app/modules/users/user.route';
import { semesterRoute } from '../app/modules/academicSemester/academicSemester.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/semester',
    route: semesterRoute,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});
export default router;
