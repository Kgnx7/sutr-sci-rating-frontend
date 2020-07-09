import { object, string, number } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  title: string().required(msg.required).trim(),
  short: string().required(msg.required).trim(),
  deanId: number().required(msg.required),
  deanAssistantId: number().required(msg.required),
  address: string().nullable().trim(),
  phone: string().nullable().trim(),
  email: string().nullable().email(msg.email).trim(),
})
