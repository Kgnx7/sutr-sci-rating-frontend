import { object, number } from 'yup'

import { validationErrorMessages as msg } from '../localization'

export default object().shape({
  // userId: number().required(msg.required),
  departmentId: number().required(msg.required),
  positionId: number().required(msg.required),
  employmentTypeId: number().required(msg.required),
  salaryRate: number().required(msg.required).min(0, msg.min).max(1, msg.max),
})
