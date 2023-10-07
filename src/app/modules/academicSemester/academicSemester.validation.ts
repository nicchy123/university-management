import { z } from 'zod';
import {
  academicSemesterCodes,
  acdemicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({ required_error: 'year is required' }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});
export const academicSemesterValidation = { createAcademicSemesterZodSchema };
