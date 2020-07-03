import { object, number } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  degreeTypeId: number().required(msg.required),
  specialtyId: number().required(msg.required),
})
