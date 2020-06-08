import { object, string, number } from 'yup'

import { validationErrorMessages as msg } from '../localization'

const dataAndId = object({
  id: number(),
  data: object(),
})

export default object().shape({
  login: string().required(msg.required).trim(),
  displayName: string().required(msg.required).trim(),
  department: dataAndId,
  position: dataAndId,
  academicDegree: dataAndId,
  academicRank: dataAndId,
  staff: dataAndId,
  salaryRate: number().nullable(),
  phone: string().nullable().trim(),
  email: string().email(msg.email).nullable(),
  yearOfBirth: number().nullable().integer().min(1900, msg.min).max(3000, msg.max),
})
