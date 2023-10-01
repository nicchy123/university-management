import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middleWares/globalErrorHandlers';
import router from './routes';
import httpStatus from 'http-status';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  });
});
app.use(globalErrorHandler);
export default app;
