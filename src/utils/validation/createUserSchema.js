import { object, string, number } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  login: string().required(msg.required).trim(),
  password: string().required(msg.required).trim(),
  surname: string().required(msg.required).trim(),
  name: string().required(msg.required).trim(),
  patronymic: string().nullable().trim(),

  academicRankId: number().required(msg.required),
  accessGroupId: number().required(msg.required),

  phone: string().nullable().trim(),
  email: string().email(msg.email).nullable(),
  yearOfBirth: number().nullable().integer().min(1900, msg.min).max(3000, msg.max),
  snils: string().matches(/^\d{4}$/, msg.snils),
})
