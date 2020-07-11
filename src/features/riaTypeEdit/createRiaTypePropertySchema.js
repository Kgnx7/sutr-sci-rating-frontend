import { object, number } from 'yup'
import { validationErrorMessages as msg } from '../../utils/localization'

export default object().shape({
  typeId: number().required(msg.required),
  propertyId: number().required(msg.required),
})
