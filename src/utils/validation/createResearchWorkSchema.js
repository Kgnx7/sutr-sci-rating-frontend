import { object, string } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  title: string().required(msg.required).trim(),
  description: string().required(msg.required).trim(),
  authors: string().required(msg.required).trim(),
  // sourceName: string().required(msg.required).trim(),
})
