import { object, string, number } from 'yup';

import { validationErrorMessages as msg } from '../localization';

export default object().shape({
  login: string().required(msg.required).trim(),
  password: string().required(msg.required).trim(),
  surname: string().required(msg.required).trim(),
  name: string().required(msg.required).trim(),
  patronymic: string().nullable().trim(),
  department: number().nullable(),
  position: number().required(msg.required),
  academicDegree: number().nullable(),
  academicRank: number().nullable(),
  staff: number().nullable(),
  salaryRate: number().nullable(),
  phone: string().nullable().trim(),
  email: string().email(msg.email).nullable(),
  yearOfBirth: number().nullable().integer().min(1900, msg.min).max(3000, msg.max),
});