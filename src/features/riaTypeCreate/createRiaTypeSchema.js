import { object, number, string } from 'yup'

import { validationErrorMessages as msg } from '../../utils/localization'

export default object().shape({
  title: string().required(msg.required),
  unit: string().required(msg.required),
  perUnit: number().required(msg.required).min(0, msg.min),
  description: string().nullable(),
  generalTypeId: number().required(msg.required),
})
