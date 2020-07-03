import { object, string, number } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  login: string().trim(),
  password: string().trim(),
  surname: string().trim(),
  name: string().trim(),
  patronymic: string().nullable().trim(),

  academicRankId: number(),
  accessGroupId: number(),

  // phone: string().nullable().trim(),
  // email: string().email(msg.email).nullable(),
  // yearOfBirth: number().nullable().integer().min(1900, msg.min).max(3000, msg.max),
  // snils: string().matches(/^\d{4}$/, msg.snils),
})
