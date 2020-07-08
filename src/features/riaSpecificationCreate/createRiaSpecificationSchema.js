import { object, string } from 'yup'

import { validationErrorMessages as msg } from '../../utils/localization'

export default object().shape({
  title: string().required(msg.required),
  dataType: string().required(msg.required),
})
