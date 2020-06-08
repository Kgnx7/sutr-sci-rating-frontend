import { object, string } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  title: string().required(msg.required).trim(),
  short: string().required(msg.required).trim(),
})
