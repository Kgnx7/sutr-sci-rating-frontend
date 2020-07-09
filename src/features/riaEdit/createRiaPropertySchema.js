import { object, string, number } from 'yup'

import { validationErrorMessages as msg } from '../../utils/localization'

export default object().shape({
  riaId: number().required(msg.required),
  propertyId: number().required(msg.required),
  value: string().required(msg.required),
})
