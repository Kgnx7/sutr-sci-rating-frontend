import { object, string } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  title: string().required(msg.required).trim(),
  short: string().required(msg.required).trim(),
  dean: string().required(msg.required).trim(),
  assistantDean: string().required(msg.required).trim(),
  address: string().trim(),
  phone: string().trim(),
  email: string().email(msg.email).trim(),
})
