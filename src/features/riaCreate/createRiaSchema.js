import { object, number, string } from 'yup'

import { validationErrorMessages as msg } from '../../utils/localization'

export const riaMetaSchema = object().shape({
  title: string().required(msg.required),
  authors: string().required(msg.required),
  description: string(),
  riaTypeId: number().required(msg.required),
  rsTypeId: number().required(msg.required),
  riaStatusId: number().required(msg.required),
})

export const authorMetaSchema = object().shape({
  userId: number().required(msg.required),
  // riaId: number().required(msg.required),
  part: number().required(msg.required).min(0, msg.min).max(100, msg.max),
  role: string().required(msg.required),
})
